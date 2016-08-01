import * as React from 'react'

const className = require('classnames');
// const debounce = require('lodash.debounce');
// import styles from 'xterm/xterm.css';

// require ('xterm/xterm.css');
require ('xterm/addons/fit');
require ('xterm/addons/fullscreen');
require ('xterm/addons/linkify');

const ReactXTerm = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		onScroll: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		className: React.PropTypes.any,
		xtermInstance: React.PropTypes.object,
	},
	getXTermInstance () {
		return this.props.xtermInstance || require('xterm');
	},
	getInitialState () {
		return {
			isFocused: false,
		};
	},
	componentDidMount () {
        // console.log('componentDidMount', this.props.options);
		const xtermInstance = this.getXTermInstance();
		// require('xterm/addons/fit/fit');
        // require('xterm/addons/fullscreen/fullscreen');
		this.xterm = new xtermInstance(this.props.options);
		this.xterm.open(this.refs.container);
		this.xterm.on('focus', this.focusChanged.bind(this, true));
		this.xterm.on('blur', this.focusChanged.bind(this, false));
		this.xterm.on('data', this.onInput);
		// this.xterm.on('resize', this.scrollChanged);
		// this.xterm.setValue(this.props.defaultValue || this.props.value || '');
	},
	componentWillUnmount () {
		// is there a lighter-weight way to remove the cm instance?
		if (this.xterm) {
			this.xterm.destroy();
            this.xterm = null;
		}
	},
	// componentWillReceiveProps: debounce(function (nextProps) {

	// 	if (typeof nextProps.options === 'object') {
	// 		// for (let optionName in nextProps.options) {
	// 		// 	if (nextProps.options.hasOwnProperty(optionName)) {
	// 		// 		this.xterm.setOption(optionName, nextProps.options[optionName]);
	// 		// 	}
	// 		// }
	// 	}
	// }, 0),
	getXTerm () {
		return this.xterm;
	},
	focus () {
		if (this.xterm) {
			this.xterm.focus();
		}
	},
	focusChanged (focused) {
		this.setState({
			isFocused: focused,
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
    onInput (data) {
		this.props.onInput && this.props.onInput(data);
	},
    layout(): void {
        this.xterm.fit();
	},
    setCursorBlink(blink: boolean): void {
		if (this.xterm && this.xterm.cursorBlink !== blink) {
			this.xterm.cursorBlink = blink;
			this.xterm.refresh(0, this.xterm.rows - 1);
		}
	},
	render () {
		const terminalClassName = className(
			'ReactXTerm',
			this.state.isFocused ? 'ReactXTerm--focused' : null,
			this.props.className
		);
		return (

			<div ref="container" className={terminalClassName}>
			</div>
		);
	},
});

module.exports = ReactXTerm;