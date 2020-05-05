

import React, { useState, useEffect } from 'react'

import { View, StyleSheet, Animated, Keyboard, BackHandler } from 'react-native'
import { backgroundColor, primary } from '../../styles/colors'
import { animateStyles } from '../../animations'
import Button from '../../components/Button'

function SlidesNavigator({
  slideNumber,
  setSlide,
  navigate,
}: {
  slideNumber: 0 | 1 | 2 | 3;
  setSlide: (slide: 0 | 1 | 2 | 3) => void;
  navigate: (route: string) => void;
}) {

  const getStyles = num =>
    [s.Point, animateStyles(slideNumber !== num ? {
      backgroundColor,
      scaleX: 1,
      scaleY: 1,
      borderWidth: 1,
    } : {
      backgroundColor: primary,
      scaleX: 1.5,
      scaleY: 1.5,
      borderWidth: 0,
    })]

  const next = () => {
    const newSlide = slideNumber + 1
    if (newSlide < 4) {
      setSlide(newSlide as any)
    } else {
      navigate('Authentication')
    }
  }

  const back = () => {
    const newSlide = slideNumber - 1
    if (newSlide > -1) {
      setSlide(newSlide as any)
      return true
    }
  }
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back)
    return () => BackHandler.removeEventListener('hardwareBackPress', back)
  })


  return (
    <View style={s.Wrapper}>

      <View style={s.Dots}>
        <Animated.View style={getStyles(0)}></Animated.View>
        <Animated.View style={getStyles(1)}></Animated.View>
        <Animated.View style={getStyles(2)}></Animated.View>
        <Animated.View style={getStyles(3)}></Animated.View>
      </View>

      <View style={s.ButtonWrapper}>
        <Button
          name="Continuar"
          type='slides'
          click={next}
          icon={{
            icon: 'arrow',
            rotate: false,
            secondaryColor: primary,
            width: 32,
          }}
          disableIconTransition={true}
        />
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

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Dots: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  ButtonWrapper: {
    width: 160,
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
