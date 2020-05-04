

import React, { useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'
import { backgroundColor } from './styles/colors'

import Button from "./components/Button"
import Toast from "./components/Toast/"
import ToastContextProvider, { ToastContext } from './contexts/toast'

function App() {
  return (
    <ToastContextProvider>

      <View style={{backgroundColor, height: '100%'}}>
        <Text style={globalStyles.Text}>Step 3</Text>

        <Button name="Exemplo" type="cancel"/>

        <Toast/>

      </View>

    </ToastContextProvider>
  )
}

export default App
