import React, { Component, Fragment } from 'react';

import './components/style';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from './components/dialog';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false
        }
    }

    openButtonClick() {
        this.setState({isDialogOpen: true});
    }

    closeButtonClick() {
        this.setState({isDialogOpen: false});
    }

    render() {
        return(
            <Fragment>
                <button onClick={this.openButtonClick.bind(this)}>OPEN</button>
                <Dialog isOpen={this.state.isDialogOpen}>
                    <DialogHeader>ダイアログヘッダー</DialogHeader>
                    <DialogBody>
                        ダイアログコンテンツ<br/>
                        ダイアログコンテンツ<br/>
                        ダイアログコンテンツ<br/>
                        ダイアログコンテンツ<br/>
                    </DialogBody>
                    <DialogFooter>
                        <button onClick={this.closeButtonClick.bind(this)} style={{float: "right"}}><span>CLOSE</span></button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }
}

export default App;