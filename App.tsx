

import React from 'react'
import { backgroundColor } from './styles/colors'

import Toast from "./components/Toast/"
import ToastContextProvider from './contexts/toast'
import AuthContextProvider from './contexts/auth'
import Navigator from './routes/'

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>

        <Navigator
          style={{backgroundColor, height: '100%'}}
        />

        <Toast/>

      </AuthContextProvider>
    </ToastContextProvider>
  )
}

export default App
