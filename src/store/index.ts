import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
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
      user: {
        username: '',
        email: '',
        password: ''
      },
      error: null,
      words: []
    },
    mutations: {
      setError(state, payload) {
        state.error = payload
      },
      setUser(state, payload) {
        state.user = payload
        state.isLogged = true
        browser.storage.sync.set({'isLogged': true})
      },
      removeUser(state){
        state.user = null
        state.isLogged = false
      },
      setWord(state, payload) {
        state.words.push(payload)
      }
      
    },
    actions: {
      async login({commit}, payload) {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', firebaseUser.user)
        })
        .catch(err => {
          commit('setError', err.message)
        })
      },
      async logout({commit}) {
        auth.signOut()
        .then(() => {
          commit('removeUser')
        })
        .catch(err => {
          commit('setError', err.message)
        })
      },
      async signUp({commit}, payload) {
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', firebaseUser.user)
        })
        .catch(err => {
          commit('setError', err.message)
        })
      }
    },
    modules: {}
})
