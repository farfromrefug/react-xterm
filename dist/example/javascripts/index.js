"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_xterm_1 = require("../../src/react-xterm");
const react_resizable_1 = require("react-resizable");
const throttle = require("lodash.throttle");
class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.throttleConsoleResize = throttle((size) => {
            this.refs.xterm && this.refs.xterm.fit();
        }, 50);
    }
    componentDidMount() {
        runFakeTerminal(this.refs.xterm);
    }
    componentWillUnmount() {
        this.refs.mainDeviceComponent.componentWillUnmount();
    }
    render() {
        return React.createElement("div", null,
            React.createElement(react_resizable_1.ResizableBox, { width: 200, height: 200, onResize: this.throttleConsoleResize, style: {
                    overflow: 'hidden'
                } },
                React.createElement(react_xterm_1.XTerm, { ref: 'xterm', style: {
                        addons: ['fit', 'fullscreen', 'search'],
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                    } })));
    }
}
react_dom_1.render(React.createElement(Main, null), document.getElementById('root'));
function runFakeTerminal(xterm) {
    const term = xterm.getTerminal();
    var shellprompt = '$ ';
    function prompt() {
        xterm.write('\r\n' + shellprompt);
    }
    ;
    xterm.writeln('Welcome to xterm.js');
    xterm.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
    xterm.writeln('Type some keys and commands to play around.');
    xterm.writeln('');
    prompt();
    term.on('key', function (key, ev) {
        var printable = (!ev.altKey && !ev.ctrlKey && !ev.metaKey);
        if (ev.keyCode == 13) {
            prompt();
        }
        else if (printable) {
            xterm.write(key);
        }
    });
    term.on('paste', function (data, ev) {
        xterm.write(data);
    });
}
