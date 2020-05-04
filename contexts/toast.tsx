
import React, { createContext, Component } from 'react'

export const ToastContext = createContext(undefined as Props)

interface Toast {
  name: string;
}

interface pushToast {
  (toast: Toast) : void;
}

interface Props {
  pushToast: pushToast;
  toasts: Toast[];
}

class ToastContextProvider extends Component {
  state = {
    toasts: [],
  }
  
  render() {
    return (
      <ToastContext.Provider value={{...this.state, pushToast: this.pushToast}}>
        {this.props.children}
      </ToastContext.Provider>
    )
  }

  pushToast: pushToast = (toast) => {
    
    console.log('I AM PUSHING A TOAST') 
  }
}

export default ToastContextProvider
