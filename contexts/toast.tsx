
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
  toast: Toast | null;
}

class ToastContextProvider extends Component {
  state = {
    toast: {
      msg: 'Preencha todos os campos.',
      type: 'success',
      duration: 300,
    } as Toast,
  }
  
  render() {
    return (
      <ToastContext.Provider value={{...this.state, pushToast: this.pushToast}}>
        {this.props.children}
      </ToastContext.Provider>
    )
  }

  pushToast: pushToast = (toast) => {
    this.setState({toast})
  }
}

export default ToastContextProvider
