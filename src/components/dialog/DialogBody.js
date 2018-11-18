import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withDialog from './withDialog';

import './dialog.scss';

class DialogBody extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.props.context.setComponent('body', this.body);
    }

    render() {
        const style = {height: this.props.context.bodyHeight};
        return(
            <div ref={body => this.body = body} style={style} className="dialog-body">{this.props.children}</div>
        )
    }
}

export default withDialog(DialogBody);