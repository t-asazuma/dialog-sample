import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dialog.scss';

class DialogFooter extends Component {
    render() {
        return(
            <div className="dialog-footer">{this.props.children}</div>
        )
    }
}

export default DialogFooter;