
import React, { createContext, Component } from 'react'

export const ToastContext = createContext(undefined as Props)

interface Toast {
  msg: string;
  duration: number;
  type: 'error' | 'success',
}

interface pushToast {
  (toast: Toast | null) : void;
}

interface Props {
  pushToast: pushToast;
  success: (msg: string) => void;
  error: (msg: string) => void;
  toast: Toast | null;
}

class ToastContextProvider extends Component {
  state = {
    toast: null as Toast,
  }
  
  render() {
    return (
      <ToastContext.Provider value={{...this.state,
        pushToast: this.pushToast,
        success: this.success,
        error: this.error,
      }}>
        {this.props.children}
      </ToastContext.Provider>
    )
  }

  pushToast: pushToast = (toast) => {
    this.setState({toast})
  }
  error = (msg: string) => {
    this.pushToast({
      msg,
      duration: 4500,
      type: 'error',
    })
  }
  success = (msg: string) => {
    this.pushToast({
      msg,
      duration: 4500,
      type: 'success',
    }) 
  }
}

export default ToastContextProvider
