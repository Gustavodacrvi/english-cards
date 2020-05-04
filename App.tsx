

import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Button from "./components/Button"

function App() {
  return (
    
    <View style={{backgroundColor: '#525A79', height: '100%'}}>
      <Text style={globalStyles.Text}>Step 3</Text>

      <Button name="Exemplo" type="cancel"/>

    </View>
  )
}

export default App
