import * as React from 'react'
import { Terminal } from 'xterm';
const className = require('classnames');
// const debounce = require('lodash.debounce');
// import styles from 'xterm/xterm.css';

// require ('xterm/xterm.css');


export interface IXtermProps extends React.DOMAttributes<{}> {
    onChange?: (e)=>void
    onInput?: (e)=>void
    onFocusChange?: Function
    addons?: string[]
    onScroll?: (e)=>void
    onContextMenu?: (e)=>void
    options?: any
    path?: string
    value?: string
    className?: string
    style?: React.CSSProperties
}
export interface IXtermState {
	isFocused: boolean
}

export default class XTerm extends React.Component<IXtermProps, IXtermState>{
	xterm: Terminal
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

	attachAddon(addon) {
		Terminal.applyAddon(addon);
	}
	componentDidMount() {
		if (this.props.addons) {
			this.props.addons.forEach(s => {
				const addon = require(`xterm/dist/addons/${s}/${s}`);
				Terminal.applyAddon(addon);
			});
		}
		this.xterm = new Terminal(this.props.options);
		this.xterm.open(this.refs.container);
		this.xterm.on('focus', this.focusChanged.bind(this, true));
		this.xterm.on('blur', this.focusChanged.bind(this, false));
		if (this.props.onContextMenu) {
			this.xterm.element.addEventListener('contextmenu', this.onContextMenu.bind(this));
		}
		if (this.props.onInput) {
			this.xterm.on('data', this.onInput);
		}
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
	getTerminal() {
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

	resize(cols: number, rows: number) {
		this.xterm.resize(Math.round(cols), Math.round(rows));
	}
	setOption(key:string, value:boolean) {
		this.xterm.setOption(key, value);
	}
	refresh() {
		this.xterm.refresh(0, this.xterm.rows - 1);
	}
	
	onContextMenu(e) {
        	this.props.onContextMenu && this.props.onContextMenu(e, this.xterm.getSelection());
    	}

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
export { Terminal, XTerm }
