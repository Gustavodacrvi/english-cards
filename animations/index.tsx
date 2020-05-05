

import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

export const animateProperty = (value: string, duration: number = 200, useNativeDriver: boolean = false): Animated.AnimatedInterpolation => {
  const [shouldRunInThisRender, runOnNextRender] = useState(false)
  const [{
    oldProperty,
    newProperty,
  }, setColors] = useState({
    oldProperty: value,
    newProperty: value,
  })

  const [animation] = useState(new Animated.Value(0))
  
  useEffect(() => {
    setColors({
      oldProperty: newProperty,
      newProperty: value,
    })
    runOnNextRender(true)
  }, [value])
  
  if (shouldRunInThisRender) {
    runOnNextRender(false)
    animation.setValue(0)
  
    Animated.timing(
      animation,
      {
        toValue: 1,
        useNativeDriver,
        duration,
      }
    ).start()
  }

  return animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldProperty, newProperty]
    })
}

export const animateStyles = (style: ViewStyle, duration: number = 200, useNativeDriver: boolean = false): {[key: string]: Animated.AnimatedInterpolation} => {
  return {
    ...Object.keys(style).reduce((obj, key) => ({
      ...obj,
      [key]: animateProperty(style[key], duration, useNativeDriver),
    }), {})
  }
}

import { ViewStyle } from 'react-native'

interface StyleOptions {
  on: ViewStyle;
  off: ViewStyle;
}

interface Events {
  duration?: number;

  beforeEnter?: (...arr: any[]) => void;
  afterEnter?: (...arr: any[]) => void;

  beforeLeave?: (...arr: any[]) => void;
  afterLeave?: (...arr: any[]) => void;

  useNativeDriver?: boolean
}


export const animateEnterLeave = ({
  on, off,
}: StyleOptions, reactNode: React.ReactNode | null, events: Events = {}): React.ReactNode => {
  const render = reactNode !== null
  
  const [animatedStyle, setAnimation] = useState({})
  const [willRemove, removeOnNextRender] = useState(false)
  const [shouldRunInThisRender, runOnNextRender] = useState(render)
  const [animation] = useState(new Animated.Value(0))
  const [node, setNode] = useState(reactNode)
  
  useEffect(() => {
    setAnimation({
      ...Object.keys(off).reduce((obj, key) => {
        return {
          ...obj,
          [key]: animation.interpolate({
            inputRange: [0, 1],
            outputRange: render ? [off[key], on[key]] : [on[key], off[key]]
          })
        }
      }, {})
    })
    runOnNextRender(true)
  }, [render])

  useEffect(() => {
    if (render) {
      setNode(reactNode)
      if (events.beforeEnter) events.beforeEnter()
    } else {
      if (events.beforeLeave) events.beforeLeave()
      removeOnNextRender(true)
    }
  }, [render])

  useEffect(() => {
    if (shouldRunInThisRender) {
      runOnNextRender(false)
      animation.setValue(0)
    
      Animated.timing(
        animation,
        {
          toValue: 1,
          useNativeDriver: events.useNativeDriver || false,
          duration: events.duration || 200,
        }
      ).start(() => {
        if (render) {
          if (events.afterEnter) events.afterEnter()
        } else {
          if (events.afterLeave) events.afterLeave()
          setNode(null)
          removeOnNextRender(false)
        }
      })
    }
  }, [shouldRunInThisRender])

  return node ? (
    <Animated.View style={[
      animatedStyle,
    ]}>
      { node }
    </Animated.View>
  ) : undefined
}

export const animateRotation = (duration: number = 500, invertDirection: boolean = false): Animated.AnimatedInterpolation => {
  
  const [spinValue] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
         toValue: 1,
         duration,
         easing: Easing.linear,
         useNativeDriver: true,
        },
      )
     ).start()
  }, )

  return spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: invertDirection ? ['360deg', '0deg'] : ['0deg', '360deg'],
  })
}

