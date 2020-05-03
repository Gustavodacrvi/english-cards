

import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import { backgroundColor } from './styles/colors'

import Button from "./components/Button"

function App() {
  return (
    <View style={{backgroundColor, height: '100%'}}>
      <Text style={globalStyles.Text}>Step 3</Text>

      <Button name="Exemplo"/>

    </View>
  )
}

export default App
