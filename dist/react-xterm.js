"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const xterm_1 = require("xterm");
exports.Terminal = xterm_1.Terminal;
const className = require('classnames');
class XTerm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onInput = data => {
            this.props.onInput && this.props.onInput(data);
        };
        this.state = {
            isFocused: false
        };
    }
    applyAddon(addon) {
        xterm_1.Terminal.applyAddon(addon);
    }
    componentDidMount() {
        if (this.props.addons) {
            this.props.addons.forEach(s => {
                const addon = require(`xterm/dist/addons/${s}/${s}.js`);
                xterm_1.Terminal.applyAddon(addon);
            });
        }
        this.xterm = new xterm_1.Terminal(this.props.options);
        this.xterm.open(this.container);
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
        if (this.xterm) {
            this.xterm.destroy();
            this.xterm = null;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.hasOwnProperty('value') && nextProps.value != this.props.value) {
            if (this.xterm) {
                this.xterm.clear();
                setTimeout(() => {
                    this.xterm.write(nextProps.value);
                }, 0);
            }
        }
        return false;
    }
    getTerminal() {
        return this.xterm;
    }
    write(data) {
        this.xterm && this.xterm.write(data);
    }
    writeln(data) {
        this.xterm && this.xterm.writeln(data);
    }
    focus() {
        if (this.xterm) {
            this.xterm.focus();
        }
    }
    focusChanged(focused) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }
    resize(cols, rows) {
        this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
    }
    setOption(key, value) {
        this.xterm && this.xterm.setOption(key, value);
    }
    refresh() {
        this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
    }
    onContextMenu(e) {
        this.props.onContextMenu && this.props.onContextMenu(e);
    }
    render() {
        const terminalClassName = className('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return React.createElement("div", { ref: ref => (this.container = ref), className: terminalClassName });
    }
}
exports.default = XTerm;
exports.XTerm = XTerm;
