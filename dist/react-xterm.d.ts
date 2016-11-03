/// <reference types="xterm" />
/// <reference types="react" />
import * as React from 'react';
import * as Xterm from 'xterm';
export interface IXtermProps {
    onChange?: Function;
    onInput?: Function;
    onFocusChange?: Function;
    onScroll?: Function;
    options?: any;
    path?: string;
    value?: string;
    className?: string;
    xtermInstance?: Xterm;
}
export interface IXtermState {
    isFocused: boolean;
}
export default class XTerm extends React.Component<IXtermProps, IXtermState> {
    xterm: any;
    refs: {
        [string: string]: any;
        container: HTMLDivElement;
    };
    constructor(props?: IXtermProps, context?: any);
    xtermInstance: any;
    getXTermInstance(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getXTerm(): any;
    write(data: any): void;
    writeln(data: any): void;
    focus(): void;
    focusChanged(focused: any): void;
    onInput: (data: any) => void;
    layout(): void;
    setCursorBlink(blink: boolean): void;
    render(): JSX.Element;
}
