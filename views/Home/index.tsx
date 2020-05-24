

import React, { useState, useCallback } from 'react'
import { View, StyleSheet, StatusBar, Text } from 'react-native'

import Header from './Header'
import { darkBackgroundColor } from '../../styles/colors'

function Home() {

  const [isMenuOpened, setMenu] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenu(!isMenuOpened)
  }, [isMenuOpened])
  
  return (
    <View
      style={s.Home}
    >
      <StatusBar barStyle="light-content" backgroundColor={darkBackgroundColor} />

      <Header
        toggleMenu={toggleMenu}
        isMenuOpened={isMenuOpened}
      />
      
    </View>
  )
}

const s = StyleSheet.create({
  Home: {
    height: '100%',
    position: 'relative',
  },
})

export default Home
