

import React, { useState } from 'react'

import { View, StyleSheet, Animated } from 'react-native'
import { backgroundColor } from '../../styles/colors'
import { animateStyles } from '../../animations'

function SlidesNavigator({
  slideNumber
}: {
  slideNumber: 0 | 1 | 2 | 3 
}) {

  const getStyles = num =>
    [s.Point, animateStyles(slideNumber !== num ? {
      backgroundColor,
      scaleX: 1,
      scaleY: 1,
      borderWidth: 1,
    } : {
      backgroundColor: 'white',
      scaleX: 1.5,
      scaleY: 1.5,
      borderWidth: 0,
    })]

  return (
    <View style={s.Wrapper}>

      <View style={s.Dots}>
        <Animated.View style={getStyles(0)}></Animated.View>
        <Animated.View style={getStyles(1)}></Animated.View>
        <Animated.View style={getStyles(2)}></Animated.View>
        <Animated.View style={getStyles(3)}></Animated.View>
      </View>
      
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    bottom: 35,
    height: 50,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  Dots: {
    display: 'flex',
    flexDirection: 'row',
  },
  Point: {
    height: 9,
    width: 9,
    marginRight: 9,
    borderRadius: 50,
    borderColor: 'white',
  },
})

export default SlidesNavigator
