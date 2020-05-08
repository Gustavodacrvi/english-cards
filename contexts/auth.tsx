import React, { createContext, Component } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const AuthContext = createContext(undefined as Props)

interface Props {
  user: FirebaseAuthTypes.User
}

class AuthContextProvider extends Component {
  state = {
    user: null as FirebaseAuthTypes.User,
  }

  componentWillMount() {
    auth().onAuthStateChanged(user => this.setState({user}))
  }

  render() {
    return (
      <AuthContext.Provider value={{...this.state}}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContextProvider

