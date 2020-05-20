

import React from 'react'
import { View } from 'react-native'
import Icon from '../components/Icon'
import { backgroundColor } from '../styles/colors'

function SplashScreen() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor,
      }}
    >
      <Icon
        icon="loading"
        width={75}
        rotate={true}
      />
    </View>    
  )
}

export default SplashScreen
