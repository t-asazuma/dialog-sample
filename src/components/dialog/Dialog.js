import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DialogContext from './DialogContext'
import './dialog.scss';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDialogMoveMouseDown: false,
            isResizeRight: false,
            isResizeBottom: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen});
    }

    dialogMoveMouseDownEvent(event) {
        console.log(this);


        this.setState({
            isDialogMoveMouseDown: true,
            offsetX: this.dialog.offsetLeft - event.clientX,
            offsetY: this.dialog.offsetTop - event.clientY,
            style: {
                width: 'auto',
                height: 'auto'
            }
        });
    }

    dialogMoveMouseUpEvent(event) {
        this.setState({isDialogMoveMouseDown: false});
    }

    dialogMoveMouseMoveEvent(event) {
        if(!this.state.isDialogMoveMouseDown) {
            return;
        }

        this.setState({
            style: {
                left: event.clientX + this.state.offsetX + 'px',
                top: event.clientY + this.state.offsetY + 'px',
            }
        });
    }

    resizeRightBottomMouseDown(event) {
        console.log(event);
        this.setState({
            isResizeRight: true,
            isResizeBottom: true
        });
    }

    resizeRightBottomMouseUp(event) {
        console.log(event);
        this.setState({
            isResizeRight: false,
            isResizeBottom: false
        });
    }


    resizeMouseMove(event) {
        const width = event.clientX - this.dialog.getBoundingClientRect().left;
        const height = event.clientY - this.dialog.getBoundingClientRect().top;

        this.setState({
            style: {
                width: width,
                height: height
            }
        })
    }

    render() {
        const { isOpen, style, children, ...attributes } = this.props;
        const context = {
            mouseDownEvent: this.dialogMoveMouseDownEvent.bind(this),
            mouseUpEvent: this.dialogMoveMouseUpEvent.bind(this),
        }

        const mergeStyle = Object.assign({}, style, {
            display: this.state.isOpen ? 'block': 'none', 
        }, this.state.style);

        return (
            <DialogContext.Provider value={context}>
                <div className='dialog-mask' 
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                </div>
                <div className="dialog-wrapper"
                        onMouseMove={this.dialogMoveMouseMoveEvent.bind(this)}
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                    <div className="dialog"
                            ref={dialog => this.dialog = dialog}
                            style={mergeStyle}>
                            <div className="dialog-content">
                                {children}
                            </div>
                            <div className="dialog-resize-area-right-bottom"
                                onMouseDown={this.resizeRightBottomMouseDown.bind(this)}
                                onMouseUp={this.resizeRightBottomMouseUp.bind(this)}
                                onMouseMove={this.resizeMouseMove.bind(this)}/>
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