

import React from 'react'
import { View } from "react-native"

export default Component => {
  return props => (
    <View style={{
      position: 'absolute',
      height: '100%',
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      bottom: 86,
      paddingLeft: 30,
      paddingRight: 30,
    }}>
      <Component {...props}/>
    </View>
  )
}

