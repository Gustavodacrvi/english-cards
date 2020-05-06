

import React, { useState, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

const easing = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
const easeIn = (x: number) => 1 - Math.cos((x * Math.PI) / 2)
const easeOut = (x: number) => Math.sin((x * Math.PI) / 2)

export const animateProperty = (value: string | number, duration: number = 200, useNativeDriver: boolean = false): Animated.AnimatedInterpolation => {

  const oldValue = useRef(value)
  const isTransitioning = useRef(false)
  
  const [animation] = useState(new Animated.Value(0))
  
  const config = useRef(animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldValue.current as any, value as any],
    }))

  if (isTransitioning.current) return config.current

  config.current = animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldValue.current as any, value as any],
    })

  oldValue.current = value
  
  animation.setValue(0)

  Animated.timing(
    animation,
    {
      toValue: 1,
      useNativeDriver,
      easing,
      duration,
    }
  ).start(() => {
    isTransitioning.current = false
  })

  isTransitioning.current = true
  return config.current
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

export const animateOnOff = ({
  on, off,
}: StyleOptions, reactNode: React.ReactNode | null, events: Events = {}): React.ReactNode => {
  const render = reactNode !== null
  
  const [animation] = useState(new Animated.Value(0))
  const isTransitioning = useRef(false)
  const node = useRef(reactNode)
  
  const animatedStyle = {
    ...Object.keys(off).reduce((obj, key) => {
      return {
        ...obj,
        [key]: animation.interpolate({
          inputRange: [0, 1],
          easing: !render ? easeIn : easeOut,
          outputRange: render ? [off[key], on[key]] : [on[key], off[key]]
        })
      }
    }, {})
  }

  if (render) {
    node.current = reactNode
    if (events.beforeEnter) events.beforeEnter()
  } else {
    if (events.beforeLeave) events.beforeLeave()
  }

  const jsx = node.current ? (
    <Animated.View style={[
      animatedStyle,
    ]}>
      { node.current }
    </Animated.View>
  ) : undefined

  if (isTransitioning.current === true) return jsx

  animation.setValue(0)

  Animated.timing(
    animation,
    {
      toValue: 1,
      useNativeDriver: events.useNativeDriver || false,
      duration: events.duration || 200,
    }
  ).start(() => {
    isTransitioning.current = false
    if (render) {
      if (events.afterEnter) events.afterEnter()
    } else {
      if (events.afterLeave) events.afterLeave()
      node.current = null
    }
  })

  isTransitioning.current = true
  return jsx
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
  })

  return spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: invertDirection ? ['360deg', '0deg'] : ['0deg', '360deg'],
  })
}

