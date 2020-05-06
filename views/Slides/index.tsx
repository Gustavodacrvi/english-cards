

import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { backgroundColor } from '../../styles/colors'
import SlidesNavigator from './Navigator'

import Slide1 from './Slide1'

function Slides({navigation}) {

  const [slide, setSlide] = useState(0 as 0 | 1 | 2 | 3)

  return (
    <View style={s.Slides}>

      <Slide1 slide={slide}/>

      <SlidesNavigator
        slideNumber={slide}
        setSlide={setSlide}
        navigate={navigation.navigate}
      />
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
