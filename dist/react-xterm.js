"use strict";
const React = require('react');
const className = require('classnames');
require('xterm/addons/fit');
require('xterm/addons/fullscreen');
require('xterm/addons/linkify');
class ReactXTerm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.getInitialState();
    }
    getXTermInstance() {
        return this.props.xtermInstance || require('xterm');
    }
    getInitialState() {
        return {
            isFocused: false,
        };
    }
    componentDidMount() {
        const xtermInstance = this.getXTermInstance();
        this.xterm = new xtermInstance(this.props.options);
        this.xterm.open(this.refs.container);
        this.xterm.on('focus', this.focusChanged.bind(this, true));
        this.xterm.on('blur', this.focusChanged.bind(this, false));
        this.xterm.on('data', this.onInput);
    }
    componentWillUnmount() {
        if (this.xterm) {
            this.xterm.destroy();
            this.xterm = null;
        }
    }
    getXTerm() {
        return this.xterm;
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
    onInput(data) {
        this.props.onInput && this.props.onInput(data);
    }
    layout() {
        this.xterm.fit();
    }
    setCursorBlink(blink) {
        if (this.xterm && this.xterm.cursorBlink !== blink) {
            this.xterm.cursorBlink = blink;
            this.xterm.refresh(0, this.xterm.rows - 1);
        }
    }
    render() {
        const terminalClassName = className('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return (React.createElement("div", {ref: "container", className: terminalClassName}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactXTerm;
