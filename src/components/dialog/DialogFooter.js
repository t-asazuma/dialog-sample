import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withDialog from './withDialog';

import './dialog.scss';

class DialogFooter extends Component {
    componentDidUpdate() {
        this.props.context.setComponent('footer', this.footer);
    }

    render() {
        return(
            <div ref={footer => this.footer = footer } className="dialog-footer">{this.props.children}</div>
        )
    }
}

export default withDialog(DialogFooter);