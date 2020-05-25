import React, { createContext, Component } from 'react'
import { AsyncStorage } from 'react-native'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import fire from '@react-native-firebase/firestore'
import { FireData, ShortTerm, SavedShortTerm, LongTerm, SavedLongTerm, WordInterface, LingueTranslationInterface, ShortTermAdd, SavedWordInterface } from '../interfaces'
import { uid, getNextReviewDate } from '../utils'
import mom from 'moment-timezone'

export const AuthContext = createContext(undefined as Props)

let unsubscribeShort
let unsubscribeLong

interface Props {
  user: FireData | null;
  data: ShortTerm | null;
  long: ShortTerm | null;
  short: ShortTerm | null;

  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, username: string) => void;
  signOut: () => void;
  sendResetEmail: (email: string) => void;
  changeEmail: (email: string) => void;
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

const isObject = item => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

class AuthContextProvider extends Component {
  state = {
    user: null,
    data: null,
    short: null,
    long: null,
  } as Props

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.setState({user})

      if (unsubscribeShort && unsubscribeLong) {
        unsubscribeShort()
        unsubscribeLong()
      }
      
      if (user) {
        unsubscribeShort = fire().collection('users').doc(user.uid).collection('short').doc('short').onSnapshot(res => {
          const short = this.convertSavedWords(res.data() as SavedShortTerm)

          this.setState({
            user: (short && short.user) || null,
            data: (this.state.long && this.mergeData(this.state.long, short)) || null,
            short,
          } as unknown as Props)
        })
        unsubscribeLong = fire().collection('users').doc(user.uid).collection('long').doc('long').onSnapshot(res => {
          const long = this.convertSavedWords(res.data() as SavedShortTerm)

          this.setState({
            data: (this.state.short && this.mergeData(this.state.short, long)) || null,
            long,
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

  mergeData(target: object, ...sources: object[]): object {
    if (!sources.length) return target
    const source = sources.shift()
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          this.mergeData(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }
  
    return this.mergeData(target, ...sources)
  }
  convertSavedWords(obj: SavedShortTerm): ShortTerm {
    const data = obj as any

    const output = data.output

    Object.keys(output).forEach(lang => {
      Object.keys(output[lang]).forEach(target => {
        Object.keys(output[lang][target]).forEach(word => {
          output[lang][target][word] = this.convertSavedWordToLocal(output[lang][target][word]) 
        })
      })
    })

    return data as ShortTerm
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
      } as SavedShortTerm)
      await user.collection('long').doc('long').set({
        uid: res.user.uid,
        output: {},
      } as SavedLongTerm)
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
  async changeEmail(email: string) {
    if (debounceTimeout)
      return;

    await auth().currentUser.updateEmail(email)
    const user = fire().collection('users').doc(auth().currentUser.uid)

    await user.set({email}, {merge: true})
    await user.collection('short').doc('short').set({
      user: {email},
    }, {merge: true})

    debounceTimeout = setTimeout(() => {
      clearTimeout(debounceTimeout)
      debounceTimeout = null
    }, 5000)
  }
  async changeDisplayName(displayName: string) {
    if (debounceTimeout)
      return;

    await auth().currentUser.updateProfile({
      displayName,
    })
    const user = fire().collection('users').doc(auth().currentUser.uid)

    await user.set({username: displayName}, {merge: true})
    await user.collection('short').doc('short').set({
      user: {username: displayName},
    }, {merge: true})

    debounceTimeout = setTimeout(() => {
      clearTimeout(debounceTimeout)
      debounceTimeout = null
    }, 5000)
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
  async removeWord(wordName: string, lang: string, targetLang: string) {
    fire().collection('short').doc('short').set({
      input: {
        [lang]: {
          [wordName]: fire.FieldValue.delete(),
        },
      },
      output: {
        [lang]: {
          [targetLang]: {
            [wordName]: fire.FieldValue.delete()
          }
        },
      },
    }, {merge: true})
  }
  async setWord(wordName: string, lang: string, targetLang: string, word: SavedWordInterface) {
    fire().collection('short').doc('short').set({
      output: {
        [lang]: {
          [targetLang]: {
            [wordName]: {...word},
          },
        },
      },
    }, {merge: true})
  }
  convertSavedWordToLocal(word: SavedWordInterface): WordInterface {
    const obj: WordInterface = {
      ...word,
      creationDate: mom.utc(word.creationDate).format('Y-M-D mm'),
    } as any
    if (obj.lastReview)
      obj.lastReview = mom.utc(word.lastReview).format('Y-M-D mm')
    
    return obj
  }

  findWord(condition: (wordName: string, word: WordInterface) => boolean): {word: WordInterface, wordName: string, lang: string, target: string} | undefined {
    const output = this.state.data.output
    const langKeys = Object.keys(output)

    for (const lang of langKeys) {
      const targetKeys = Object.keys(output[lang])
      
      for (const target of targetKeys) {
        const outputWords = Object.keys(output[lang][target])

        for (const out of outputWords) {
          if (condition(out, output[lang][target][out])) {
            return {
              word: output[lang][target][out],
              wordName: out,
              lang, target,
            }
          }
        }

      }

    }
  }
  getWordByUid(uid: string): {word: WordInterface, wordName: string, lang: string, target: string} | undefined {
    return this.findWord((w, word) => word.uid === uid)
  }

  async addWord(word: string, api: 'linguee', data: LingueTranslationInterface, lang: string, target: string) {
    fire().collection('short').doc('short').set({
      input: {
        [lang]: {
          [word]: new Date(),
        },
      },
      output: {
        [lang]: {
          [target]: {
            [word]: {
              api,
              data,
              uid: uid(),
              creationDate: new Date(),
              lastReview: null,
              reviewNumber: null,
            }
          }
        },
      },
    } as any, {merge: true})
  }
  async deleteWord(uid: string) {
    const target = this.getWordByUid(uid)
    if (!target)
      throw `Target word not found, the word does not exist on output or the logic is flawed.`
    
    this.removeWord(target.wordName, target.lang, target.target)
  }
  async saveWord(uid: string, word: SavedWordInterface) {
    const target = this.findWord((w, wordCompare) => wordCompare.uid === uid)
    if (!target)
      throw `Target word not found, the word does not exist on output or the logic is flawed.`
    
    this.setWord(target.wordName, target.lang, target.target, word)
  }
  async studyWord(uid: string) {
    const res = this.getWordByUid(uid)
    if (!res)
      throw `Target word not found, the word does not exist on output or the logic is flawed.`
    
    this.saveWord(uid, {
      lastReview: mom(getNextReviewDate(res.word), 'Y-M-D mm').utc().toDate(),
      reviewNumber: fire.FieldValue.increment(1),
    })
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

