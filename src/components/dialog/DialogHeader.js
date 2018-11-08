import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DialogContext from './DialogContext';

import './dialog.scss';

class DialogHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseDown: false
        }
    }

    render() {
        return(
            <DialogContext.Consumer>
                {({mouseDownEvent, mouseUpEvent}) => 
                {
                    return (
                    <div ref={dialogHeader => this.dialogHeader = dialogHeader}
                            className="dialog-header"
                            onMouseDown={mouseDownEvent}>
                        {this.props.children}
                    </div>
                )}}
            </DialogContext.Consumer>
        )
    }
}

export default DialogHeader;