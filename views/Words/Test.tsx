

import React from 'react'
import Child from './Child'
import { View } from 'react-native'

function Test({num}) {
  return (
    <View>
      <Child
        num={num}
      />
      <Child
        num={num}
      />
    </View>
  )
}

export default Test
