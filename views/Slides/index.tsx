

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { backgroundColor } from '../../styles/colors'
import SlidesNavigator from './Navigator'

function Slides() {
  return (
    <View style={s.Slides}>
      <Text>
        slides
      </Text>

      <SlidesNavigator slideNumber={0}/>
    </View>
  )
}

const s = StyleSheet.create({
  Slides: {
    backgroundColor,
    height: '100%',
  },
})

export default Slides
