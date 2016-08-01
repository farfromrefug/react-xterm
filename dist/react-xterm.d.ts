declare module reactxterm {
import * as React from 'react';
export interface IXtermProps {
    onChange: React.PropTypes.func;
    onInput: React.PropTypes.func;
    onFocusChange: React.PropTypes.func;
    onScroll: React.PropTypes.func;
    options: React.PropTypes.object;
    path: React.PropTypes.string;
    value: React.PropTypes.string;
    className: React.PropTypes.any;
    xtermInstance: React.PropTypes.object;
}
export interface IXtermState {
    isFocused: boolean;
}
export default class ReactXTerm extends React.Component<IXtermProps, IXtermState> {
    xterm: any;
    refs: {
        [string: string]: any;
        container: HTMLDivElement;
    };
    constructor(props?: IXtermProps, context?: any);
    getXTermInstance(): any;
    getInitialState(): {
        isFocused: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    getXTerm(): any;
    focus(): void;
    focusChanged(focused: any): void;
    onInput(data: any): void;
    layout(): void;
    setCursorBlink(blink: boolean): void;
    render(): JSX.Element;
}
}

declare module "react-xterm" {
    import a = reactxterm;
    export = a;
}