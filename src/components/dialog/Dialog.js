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
            isResizeBottom: false,
            bodyHeight: null
        }
        this.components = {};
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen});
    }

    dialogMoveMouseDownEvent(event) {
        this.wrapper.style.zIndex = 1300;
        this.setState({
            isDialogMoveMouseDown: true,
            offsetX: this.dialog.offsetLeft - event.clientX,
            offsetY: this.dialog.offsetTop - event.clientY,
        });
    }

    dialogMoveMouseUpEvent(event) {
        this.setState({isDialogMoveMouseDown: false});
    }

    resizeRightBottomMouseDown(event) {
        this.wrapper.style.zIndex = 1300;
        const expectBodyHeight = this.dialogContent.clientHeight - this.components.body.offsetHeight;
        const offset = this.dialog.clientHeight - this.dialogContent.clientHeight;

        this.setState({
            isResizeRight: true,
            isResizeBottom: true,
            expectBodyHeight: expectBodyHeight,
            offset: offset
        });
    }

    mouseUpEvent(event) {
        this.wrapper.style.zIndex = 1;
        this.setState({
            isDialogMoveMouseDown: false,
            isResizeRight: false,
            isResizeBottom: false
        });
    }

    mouseMoveEvent(event) {
        this.dialogMove(event);
        this.resize(event);
    }

    dialogMove(event) {
        if(!this.state.isDialogMoveMouseDown) {
            return;
        }

        let newStyle = Object.assign({}, this.state.style, {
            left: event.clientX + this.state.offsetX + 'px',
            top: event.clientY + this.state.offsetY + 'px',
        })

        this.setState({
            style: newStyle
        });
    }

    resize(event) {
        if(!this.state.isResizeRight && !this.state.isResizeBottom) {
            return;
        }


        let width = this.dialog.clientWidth;
        let height = this.dialog.clientHeight;

        if(this.state.isResizeRight) {
            width = event.clientX - this.dialog.getBoundingClientRect().left;
        }

        if(this.state.isResizeBottom) {
            height = event.clientY - this.dialog.getBoundingClientRect().top;
        }

        const bodyHeight = height - this.state.offset - this.state.expectBodyHeight

        let newStyle = Object.assign({}, this.state.style, {
            width: width,
            height: height
        })

        this.setState({
            style: newStyle,
            bodyHeight: bodyHeight
        });

    }

    setComponent(name, component) {
        this.components[name] = component;
    }

    render() {
        const { isOpen, style, children, ...attributes } = this.props;
        const context = {
            mouseDownEvent: this.dialogMoveMouseDownEvent.bind(this),
            mouseUpEvent: this.dialogMoveMouseUpEvent.bind(this),
            setComponent: this.setComponent.bind(this),
            bodyHeight: this.state.bodyHeight
        }

        const mergeStyle = Object.assign({}, style, {
            display: this.state.isOpen ? 'block': 'none', 
        }, this.state.style);

        return (
            <DialogContext.Provider value={context}>
                <div className='dialog-mask' 
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                </div>
                <div ref={wrapper => this.wrapper = wrapper}
                        className="dialog-wrapper"
                        onMouseMove={this.mouseMoveEvent.bind(this)}
                        onMouseUp={this.mouseUpEvent.bind(this)}
                        style={{display: this.state.isOpen ? 'block': 'none'}}>
                </div>
                <div className="dialog"
                        ref={dialog => this.dialog = dialog}
                        style={mergeStyle}>
                    <div className="dialog-content"
                            ref={dialogContent => this.dialogContent = dialogContent }>

                        {children}
                    </div>
                    <div className="dialog-resize-area-right-bottom"
                        onMouseDown={this.resizeRightBottomMouseDown.bind(this)}/>
                </div>
            </DialogContext.Provider>
    )
    }
}

Dialog.propTypes = {
    isOpen: PropTypes.bool,
}

export default Dialog;
