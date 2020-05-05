

import React, { useState, useEffect } from 'react'
import { Text, View, Animated } from 'react-native'

import globalStyles from './styles/'
import { backgroundColor } from './styles/colors'

import Button from "./components/Button"
import Toast from "./components/Toast/"
import ToastContextProvider from './contexts/toast'
import { animateStyles } from './animations'

function App() {
  return (
    <ToastContextProvider>

      <View style={{backgroundColor, height: '100%'}}>
        <Text style={globalStyles.Text}>Step 3</Text>

        <Button
          name="Exemplo"
        />

        <Toast/>

      </View>

    </ToastContextProvider>
  )
}

export default App
