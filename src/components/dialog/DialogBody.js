import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dialog.scss';

class DialogBody extends Component {
    render() {
        return(
            <div className="dialog-body">{this.props.children}</div>
        )
    }
}

export default DialogBody;