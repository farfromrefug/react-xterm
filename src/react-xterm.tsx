import * as React from 'react'
import * as Xterm from 'xterm'

const className = require('classnames');
// const debounce = require('lodash.debounce');
// import styles from 'xterm/xterm.css';

// require ('xterm/xterm.css');


export interface IXtermProps {
	onChange?: Function
	onInput?: Function
	onFocusChange?: Function
	onScroll?: Function
	options?: any
	path?: string
	value?: string
	className?: string
	xtermInstance?: Xterm
}
export interface IXtermState {
	isFocused: boolean
}

export default class XTerm extends React.Component<IXtermProps, IXtermState>{
	xterm: any
	refs: {
		[string: string]: any;
		container: HTMLDivElement;
	}
	constructor(props?: IXtermProps, context?: any) {
		super(props, context);
		this.state = {
			isFocused: false
		};
	}

	xtermInstance
	getXTermInstance() {
		if (!this.xtermInstance) {
			this.xtermInstance = this.props.xtermInstance || Xterm;
			// require('xterm/addons/fit').attach(this.xtermInstance);
			// require ('xterm/addons/fullscreen');
			// require('xterm/addons/linkify').attach(this.xtermInstance);
		}
		return this.xtermInstance;
	}
	attachAddon(addon) {
		addon.attach(this.xtermInstance);
	}
	componentDidMount() {
		// console.log('componentDidMount', this.props.options);
		const xtermInstance = this.getXTermInstance();
		// require('xterm/addons/fit/fit');
		// require('xterm/addons/fullscreen/fullscreen');
		this.xterm = new xtermInstance(this.props.options);
		this.xterm.open(this.refs.container, true);
		this.xterm.on('focus', this.focusChanged.bind(this, true));
		this.xterm.on('blur', this.focusChanged.bind(this, false));
		if (this.props.onInput) {
			this.xterm.on('data', this.onInput);
		}
		// this.xterm.on('resize', this.scrollChanged);
		if (this.props.value) {
			this.xterm.write(this.props.value);
		}
	}
	componentWillUnmount() {
		// is there a lighter-weight way to remove the cm instance?
		if (this.xterm) {
			this.xterm.destroy();
			this.xterm = null;
		}
	}
	// componentWillReceiveProps: debounce(function (nextProps) {

	// 	if (typeof nextProps.options === 'object') {
	// 		// for (let optionName in nextProps.options) {
	// 		// 	if (nextProps.options.hasOwnProperty(optionName)) {
	// 		// 		this.xterm.setOption(optionName, nextProps.options[optionName]);
	// 		// 	}
	// 		// }
	// 	}
	// }, 0),
	getXTerm() {
		return this.xterm;
	}
	write(data: any) {
		this.xterm.write(data);
	}
	writeln(data: any) {
		this.xterm.writeln(data);
	}
	focus() {
		if (this.xterm) {
			this.xterm.focus();
		}
	}
	focusChanged(focused) {
		this.setState({
			isFocused: focused,
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	}
	onInput = (data) => {
		this.props.onInput && this.props.onInput(data);
	}
	fit = () => {
		var geometry = this.proposeGeometry(this.xterm);
		this.resize(geometry.cols, geometry.rows);
	}
	resize(cols: number, rows: number) {
		this.xterm.resize(cols, rows);
	}
	setCursorBlink(blink: boolean): void {
		if (this.xterm && this.xterm.cursorBlink !== blink) {
			this.xterm.cursorBlink = blink;
			this.xterm.refresh(0, this.xterm.rows - 1);
		}
	}
	proposeGeometry(term) {
		var parentElementStyle = window.getComputedStyle(term.element.parentElement),
			parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height')),
			parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')) - 17),
			elementStyle = window.getComputedStyle(term.element),
			elementPaddingVer = parseInt(elementStyle.getPropertyValue('padding-top')) + parseInt(elementStyle.getPropertyValue('padding-bottom')),
			elementPaddingHor = parseInt(elementStyle.getPropertyValue('padding-right')) + parseInt(elementStyle.getPropertyValue('padding-left')),
			availableHeight = parentElementHeight - elementPaddingVer,
			availableWidth = parentElementWidth - elementPaddingHor,
			container = term.rowContainer,
			subjectRow = term.rowContainer.firstElementChild,
			contentBuffer = subjectRow.innerHTML,
			characterHeight,
			rows,
			characterWidth,
			cols,
			geometry;

		subjectRow.style.display = 'inline';
		subjectRow.innerHTML = 'W'; // Common character for measuring width, although on monospace
		characterWidth = subjectRow.getBoundingClientRect().width;
		subjectRow.style.display = ''; // Revert style before calculating height, since they differ.
		characterHeight = parseInt(subjectRow.offsetHeight);
		subjectRow.innerHTML = contentBuffer;

		rows = availableHeight / characterHeight;
		cols = availableWidth / characterWidth;

		geometry = { cols: cols, rows: rows };
		return geometry;
	};
	render() {
		const terminalClassName = className(
			'ReactXTerm',
			this.state.isFocused ? 'ReactXTerm--focused' : null,
			this.props.className
		);
		return (

			<div ref="container" className={terminalClassName}>
			</div>
		);
	}
}