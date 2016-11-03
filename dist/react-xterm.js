"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Xterm = require('xterm');
var className = require('classnames');
var XTerm = (function (_super) {
    __extends(XTerm, _super);
    function XTerm(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.onInput = function (data) {
            _this.props.onInput && _this.props.onInput(data);
        };
        this.state = {
            isFocused: false
        };
    }
    XTerm.prototype.getXTermInstance = function () {
        if (!this.xtermInstance) {
            this.xtermInstance = this.props.xtermInstance || new Xterm();
            require('xterm/addons/fit').attach(this.xtermInstance);
            require('xterm/addons/linkify').attach(this.xtermInstance);
        }
        return this.xtermInstance;
    };
    XTerm.prototype.componentDidMount = function () {
        var xtermInstance = this.getXTermInstance();
        this.xterm = new xtermInstance(this.props.options);
        this.xterm.open(this.refs.container);
        this.xterm.on('focus', this.focusChanged.bind(this, true));
        this.xterm.on('blur', this.focusChanged.bind(this, false));
        if (this.props.onInput) {
            this.xterm.on('data', this.onInput);
        }
    };
    XTerm.prototype.componentWillUnmount = function () {
        if (this.xterm) {
            this.xterm.destroy();
            this.xterm = null;
        }
    };
    XTerm.prototype.getXTerm = function () {
        return this.xterm;
    };
    XTerm.prototype.write = function (data) {
        this.xterm.write(data);
    };
    XTerm.prototype.writeln = function (data) {
        this.xterm.writeln(data);
    };
    XTerm.prototype.focus = function () {
        if (this.xterm) {
            this.xterm.focus();
        }
    };
    XTerm.prototype.focusChanged = function (focused) {
        this.setState({
            isFocused: focused,
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    };
    XTerm.prototype.layout = function () {
        this.xterm.fit();
    };
    XTerm.prototype.setCursorBlink = function (blink) {
        if (this.xterm && this.xterm.cursorBlink !== blink) {
            this.xterm.cursorBlink = blink;
            this.xterm.refresh(0, this.xterm.rows - 1);
        }
    };
    XTerm.prototype.render = function () {
        var terminalClassName = className('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return (React.createElement("div", {ref: "container", className: terminalClassName}));
    };
    return XTerm;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XTerm;
