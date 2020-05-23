import React, { createContext, Component } from 'react'
import { AsyncStorage } from 'react-native'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import fire from '@react-native-firebase/firestore'
import { FireData, ShortTerm, LongTerm, WordInterface } from '../interfaces'

export const AuthContext = createContext(undefined as Props)

let unsubscribe

interface Props {
  user: FirebaseAuthTypes.User | null;
  data: FireData | null;

  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, username: string) => void;
  signOut: () => void;
  sendResetEmail: (email: string) => void;
}

let debounceTimeout = null

const errors = {
  'auth/invalid-email': 'O email digitado não está válido',
  'auth/wrong-password': 'Você digitou a senha errada',
  'auth/account-exists-with-different-credential': 'Conta já existe com credencial diferente',
  'auth/credential-already-in-use': 'A credencial já está em uso',
  'auth/email-already-in-use': 'O email já está em uso',
  'auth/weak-password': 'A senha está fraca. Tente com uma mais forte',
  'auth/expired-action-code': 'O código de resetar a senha expirou',
  'auth/invalid-action-code': 'O código de resetar a senha não é válido ou já está em uso',
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/invalid-user-token': 'Token inválido',
  'auth/user-token-expired': 'Token expirado'
}

class AuthContextProvider extends Component {
  state = {
    user: null,
    data: null,
  } as Props

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.setState({user})

      if (unsubscribe)
        unsubscribe()
      
      if (user) {
        unsubscribe = fire().collection('users').doc(user.uid).collection('short').doc('short').onSnapshot(res => {
          const data: ShortTerm = res.data() as ShortTerm
          this.setState({
            data: (data && data.user) || null,
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
      AsyncStorage.setItem('FlashTranslator.isLoggedIn', 'true')
    } catch (err) {
      throw errors[err.code] || "Houve um erro ao tentar entrar, tente de novo."
    }
  }
  async signUp(email: string, password: string, username: string) {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password)
      const user = fire().collection('users').doc(res.user.uid)
      const userData = {
        uid: res.user.uid,
        username, email,
      }
      await user.set(userData as FireData)
      await user.collection('short').doc('short').set({
        user: userData,
        uid: res.user.uid,
        input: {},
        output: {},
      } as ShortTerm)
      await user.collection('long').doc('long').set({
        uid: res.user.uid,
        output: {},
      } as LongTerm)
      AsyncStorage.setItem('FlashTranslator.isLoggedIn', 'true')
    } catch (err) {
      if (auth().currentUser)
        auth().currentUser.delete()
      throw errors[err.code] || "Houve algum erro ao tentar criar conta, tente de novo."
    }
  }
  async signOut() {
    await auth().signOut()
    AsyncStorage.setItem('FlashTranslator.isLoggedIn', 'false')
  }
  async sendResetEmail(email: string) {
    try {
      if (debounceTimeout)
        return;
  
      await auth().sendPasswordResetEmail(email)
      debounceTimeout = setTimeout(() => {
        clearTimeout(debounceTimeout)
        debounceTimeout = null
      }, 5000)
    } catch (err) {
      throw "Houve algum erro ao tentar mandar uma e-mail de mudança de senha."
    }
  }

  async getTranslation(term: string, api: 'linguee') {
/*     try {
      switch (api) {
        case 'linguee': {
          const res = await Linguee.translate(term, {from: 'eng', to: 'por'})
          console.log(res)
        }
      }
    } catch (err) {
      throw "Essa tradução não existe ou você está com erros na conexão.";
    } */
  }
  async addWord(word: WordInterface) {

  }
  async removeWordByUid(uid: string) {

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

