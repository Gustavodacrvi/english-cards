import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import { storage } from '../services/storage'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDB4r-56op-Z9sgHzE39W3ygp7PH8BbNFk",
  authDomain: "english-cards-1c691.firebaseapp.com",
  databaseURL: "https://english-cards-1c691.firebaseio.com",
  projectId: "english-cards-1c691",
  storageBucket: "english-cards-1c691.appspot.com",
  messagingSenderId: "864055444449",
  appId: "1:864055444449:web:d8daeaec36b8323828c8a0"
}
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      isLogged: false,
      user: null ,
      error: null,
      words: [],
      errors: {
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
    },
    mutations: {
      setError(state, payload) {
        state.error = state.errors[payload] || null
      },
      setUser(state, payload) {
        if(payload) {
          state.isLogged = true
          storage.set('isLogged', true)
          state.user = payload
					storage.set('uid', payload.uid)
        }

      },
			removeUser(state) {
				state.user = null
				storage.remove('isLogged')
			},
      setWord(state, payload) {
        state.words.push(payload)
      }
      
    },
    actions: {
      async login({commit}, payload) {
        try {
          const firebaseUser = await auth.signInWithEmailAndPassword(payload.email, payload.password)
          commit('setUser', {uid: firebaseUser.user?.uid, email: firebaseUser.user?.email, username: payload.username})
          commit('setError', null)
        } catch (err) {
          commit('setUser', null)
          commit('setError', err.code)
        }
        
      },
      async logout({commit}) {
         await auth.signOut()
         commit('removeUser')
      },
      async signUp({commit}, payload) {
        try {
          const firebaseUser = await auth.createUserWithEmailAndPassword(payload.email, payload.password)
          commit('setUser', {uid: firebaseUser.user?.uid, email: firebaseUser.user?.email, username: payload.username})
          await firestore.collection('users').doc(firebaseUser.user?.uid).set({
            uid: firebaseUser.user?.uid,
            username: payload.username,
            email: firebaseUser.user?.email
          })
          commit('setError', null)
        }
        catch(err) {
          commit('setError', err.code)
        }
      },
	async findUser(context, uid) {
		const res = await firestore.collection('users').where('uid', '==', uid).get()
		if(!res.docs[0]) {
			return null
		}
		return res.docs[0].data()
	}
    },
    modules: {}
})
auth.onAuthStateChanged(async user => {
	console.log(user.uid)
	store.commit('setUser', {uid: user.uid, email: user.email})
})
export default store
