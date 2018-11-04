import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DialogContext from './DialogContext'
import './dialog.scss';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isMouseDown: false
        }
    }

    componentWillReceiveProps(props) {
        console.log(props);
        console.log(this);
        this.setState({isOpen: props.isOpen});
    }

    mouseDownEvent(event) {
        console.log(this);
        this.setState({
            isMouseDown: true,
            offsetX: this.dialog.offsetLeft - event.clientX,
            offsetY: this.dialog.offsetTop - event.clientY
        });
    }

    mouseUpEvent(event) {
        this.setState({isMouseDown: false});
    }

    mouseMoveEvent(event) {
        if(!this.state.isMouseDown) {
            return;
        }

        // TODO: ２回目の移動時正しく位置情報を取得できない
        this.setState({
            style: {
                left: event.clientX + this.state.offsetX + 'px',
                top: event.clientY + this.state.offsetY + 'px',
            }
        });
    }

    render() {
        const { isOpen, style, children, ...attributes } = this.props;
        const context = {
            mouseDownEvent: this.mouseDownEvent.bind(this),
            mouseUpEvent: this.mouseUpEvent.bind(this),
            mouseMoveEvent: this.mouseMoveEvent.bind(this)
        }

        const mergeStyle = Object.assign({}, style, {
            display: this.state.isOpen ? 'block': 'none', 
        }, this.state.style);

        return (
            <DialogContext.Provider value={context}>
                <div className='dialog-mask' 
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                </div>
                <div className="dialog"
                        ref={dialog => this.dialog = dialog} 
                        onMouseMove={this.mouseMoveEvent.bind(this)}
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                        <div className="dialog-content" style={mergeStyle}>
                            {children}
                        </div>
                </div>
            </DialogContext.Provider>
    )
    }
}

Dialog.propTypes = {
    isOpen: PropTypes.bool,
}

export default Dialog;
export { DialogContext };