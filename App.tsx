

import React from 'react'
import { backgroundColor } from './styles/colors'

import Toast from "./components/Toast/"
import ToastContextProvider from './contexts/toast'
import Navigator from './routes/'

function App() {
  return (
    <ToastContextProvider>

      <Navigator
        style={{backgroundColor, height: '100%'}}
      />

      <Toast/>

    </ToastContextProvider>
  )
}

export default App
