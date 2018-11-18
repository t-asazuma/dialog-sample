import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withDialog from './withDialog';

import './dialog.scss';

class DialogHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseDown: false
        }
    }

    componentDidUpdate() {
        this.props.context.setComponent('header', this.dialogHeader);
    }

    render() {
        return(
            <div ref={dialogHeader => this.dialogHeader = dialogHeader}
                    className="dialog-header"
                    onMouseDown={this.props.context.mouseDownEvent}>
                {this.props.children}
            </div>
        )
    }
}

export default withDialog(DialogHeader);
