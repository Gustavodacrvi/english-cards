

import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Button from "./components/Button"

function App() {
  const [color, setColor] = useState('cancel')
  
  const change = () => {
    
    setTimeout(() => {

      setColor('default')

      setTimeout(() => {

        setColor('white')

        setTimeout(() => {


          setColor('slides')

          change()
          
        }, 3000)
        
      }, 3000)

    }, 3000)
    
  }

  useEffect(() => {
    change()
  }, [])
  
  return (
    
    <View style={{backgroundColor: '#525A79', height: '100%'}}>
      <Text style={globalStyles.Text}>Step 3</Text>

      <Button name="Exemplo" type={color}/>

    </View>
  )
}

export default App
