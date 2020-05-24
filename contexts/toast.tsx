
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
  success: (msg: string, duration?: number) => void;
  error: (msg: string, duration?: number) => void;
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
  error = (msg: string, duration: number = 4500) => {
    this.pushToast({
      msg,
      duration,
      type: 'error',
    })
  }
  success = (msg: string, duration: number = 4500) => {
    this.pushToast({
      msg,
      duration,
      type: 'success',
    }) 
  }
}

export default ToastContextProvider
