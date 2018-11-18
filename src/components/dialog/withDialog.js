import React from 'react';
import DialogContext from './DialogContext';

function withDialog(Component) {
    function WithDialog(props) {
      return (
          <DialogContext.Consumer>
              { context => <Component context={context} {...props}/>}
          </DialogContext.Consumer>
        
      );
    }
  
    return WithDialog;
  }

  export default withDialog;