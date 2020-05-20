

import React, { useState, useEffect, useRef } from 'react'
import { Animated, Easing, TextStyle } from 'react-native'

const defaultSpringProperties = {
  bounciness: 12,
  speed: 16,
}

export const animateProperty = (value: string | number, useNativeDriver: boolean = false, springProperties?: Animated.SpringAnimationConfig): Animated.AnimatedInterpolation => {

  const oldValue = useRef(value)
  
  const animation = new Animated.Value(0)
  
  const config = animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldValue.current as any, value as any],
    })

  oldValue.current = value
  
  animation.setValue(0)

  Animated.spring(
    animation,
    {
      toValue: 1,
      useNativeDriver,
      restSpeedThreshold: 200,
      ...(springProperties || defaultSpringProperties),
    }
  ).start()

  return config
}

export const animateStyles = (style: ViewStyle | TextStyle, useNativeDriver: boolean = false, springProperties?: Animated.SpringAnimationConfig): {[key: string]: Animated.AnimatedInterpolation} => {
  return {
    ...Object.keys(style).reduce((obj, key) => ({
      ...obj,
      [key]: animateProperty(style[key], useNativeDriver, springProperties),
    }), {})
  }
}

import { ViewStyle } from 'react-native'
import { duration } from 'moment-timezone'

interface StyleOptions {
  on: ViewStyle | TextStyle;
  off: ViewStyle | TextStyle;
}

interface Events {
  beforeEnter?: (...arr: any[]) => void;
  afterEnter?: (...arr: any[]) => void;

  beforeLeave?: (...arr: any[]) => void;
  afterLeave?: (...arr: any[]) => void;

  useNativeDriver?: boolean
}

export const animateOnOff = ({
  on, off,
}: StyleOptions, reactNode: React.ReactNode | null, events: Events = {}, springProperties?: Animated.SpringAnimationConfig): React.ReactNode => {
  const render = reactNode !== null
  
  const [animation] = useState(new Animated.Value(0))
  const node = useRef(reactNode)

  const getInterpolation = (offKey, onKey) => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: render ? [offKey, onKey] : [onKey, offKey]
    }) 
  }
  
  const interpolateArray = (onKey: Array<ViewStyle | TextStyle>, offKey: Array<ViewStyle | TextStyle>) => {
    // onKey : [{translateX: 50}]
    const arr = []
    for (let i = 0;i < onKey.length; i++) {
      arr.push(
        Object.keys(offKey[i]).reduce((obj, key) => ({
          ...obj,
          [key]: getInterpolation(offKey[i][key], onKey[i][key]),
        }), {})
      )
    }
    return arr
  }
  
  const animatedStyle = {
    ...Object.keys(off).reduce((obj, key) => {
      return {
        ...obj,
        [key]: !Array.isArray(off[key]) ? getInterpolation(off[key], on[key]) : interpolateArray(on[key], off[key])
      }
    }, {})
  }

  if (reactNode)
    node.current = reactNode

  if (render) {
    if (events.beforeEnter) events.beforeEnter()
  } else {
    if (events.beforeLeave) events.beforeLeave()
  }

  animation.setValue(0)

  Animated.spring(
    animation,
    {
      toValue: 1,
      useNativeDriver: events.useNativeDriver || false,
      ...(springProperties || defaultSpringProperties),
    }
  ).start(() => {
    if (render) {
      if (events.afterEnter) events.afterEnter()
    } else {
      if (events.afterLeave) events.afterLeave()
      node.current = null
    }
  })

  return (reactNode || node.current) ? (
    <Animated.View style={animatedStyle}>
      { reactNode || node.current }
    </Animated.View>
  ) : undefined
}

export const animateRotation = (duration: number = 700, invertDirection: boolean = false): Animated.AnimatedInterpolation => {
  
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

