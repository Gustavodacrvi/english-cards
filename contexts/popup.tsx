
import React, { createContext, Component } from 'react'

export const PopupContext = createContext(undefined as Props)

interface pushPopup {
  (comp: () => JSX.Element | null) : void;
}

interface Props {
  Component: () => JSX.Element | null;
  pushPopup: pushPopup;
}

class PopupContextProvider extends Component {
  state = {
    Component: null,
  } as Props
  
  render() {
    return (
      <PopupContext.Provider value={{...this.state,
        pushPopup: this.pushPopup,
      }}>
        {this.props.children}
      </PopupContext.Provider>
    )
  }

  pushPopup: pushPopup = (Component) => {
    this.setState({Component})
  }
}

export default PopupContextProvider
