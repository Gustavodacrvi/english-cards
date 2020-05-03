

import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Icon from "./components/Icon"

function App() {
  const [color, setColor] = useState('yellow')

  const change = () => {

    setTimeout(() => {
  
      setColor('purple')
  
      setTimeout(() => {
  
        setColor('blue')
  
        setTimeout(() => {
  
          setColor('orange')

          change()
      
        }, 3500)
    
      }, 3500)
  
    }, 3500)
  }

  useEffect(() => {
    change()
  }, [])
  
  return (
    <View style={{backgroundColor: '#525A79', height: '100%'}}>
      <Text style={globalStyles.Text}>Step 3</Text>

      <Icon icon="home" primaryColor={color}/>

    </View>
  )
}

export default App
