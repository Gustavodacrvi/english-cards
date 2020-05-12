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

export default new Vuex.Store({
    state: {
      isLogged: false,
      user: {} ,
      error: null,
      words: [],
      errors: {
        'auth/invalid-email': 'O email não está formatado corretamente',
        'auth/wrong-password': 'Você digitou a senha errada',
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
        }
        state.user = payload

      },
      setWord(state, payload) {
        state.words.push(payload)
      }
      
    },
    actions: {
      async login({commit}, payload) {
        try {
          const firebaseUser = await auth.signInWithEmailAndPassword(payload.email, payload.password)
          commit('setUser', firebaseUser.user)
          commit('setError', null)
        } catch (err) {
          commit('setUser', null)
          commit('setError', err.code)
        }
        
      },
      async logout({commit}) {
        auth.signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(err => {
          commit('setError', err.code)
        })
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
      }
    },
    modules: {}
})
