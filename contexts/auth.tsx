import React, { createContext, Component } from 'react'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import fire from '@react-native-firebase/firestore'
import { FireData } from '../interfaces'

export const AuthContext = createContext(undefined as Props)

let unsubscribe

interface Props {
  user: FirebaseAuthTypes.User | null;
  data: FireData | null;

  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, username: string) => void;
  signOut: () => void;
  sendResetEmail: () => void;
}

let debounceTimeout = null

class AuthContextProvider extends Component {
  state = {
    user: null,
    data: null,
  } as Props

  componentWillMount() {
    auth().onAuthStateChanged(user => {
      this.setState({user})

      if (unsubscribe)
        unsubscribe()
      
      if (user) {
        unsubscribe = fire().collection('users').doc(user.uid).onSnapshot(res => {
          this.setState({
            data: res.data() || null,
          })
        })
      } else {
        this.setState({
          user: null,
          data: null,
        })
      }
    })
  }

  async signIn(email: string, password: string) {
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      throw "Houve um erro ao tentar entrar, tente de novo."
    }
  }
  async signUp(email: string, password: string, username: string) {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password)
      await fire().collection('users').doc(res.user.uid).set({
        uid: res.user.uid,
        username, email,
      })
    } catch (err) {
      if (auth().currentUser)
        auth().currentUser.delete()
      throw "Houve algum erro ao tentar criar conta, tente de novo."
    }
  }
  async signOut() {
    await auth().signOut()
  }
  async sendResetEmail() {
    if (debounceTimeout)
      return;

    console.log('run')
    // auth().sendPasswordResetEmail()
    debounceTimeout = setTimeout(() => {
      clearTimeout(debounceTimeout)
      debounceTimeout = null
    }, 5000)
  }

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
        sendResetEmail: this.sendResetEmail,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContextProvider

