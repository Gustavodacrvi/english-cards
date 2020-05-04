

import React from 'react'
import { useState, useEffect } from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'

interface Options {

  on: ViewStyle;
  off: ViewStyle;
}

interface Events {
  duration?: number;

  beforeEnter?: (...arr: any[]) => void;
  afterEnter?: (...arr: any[]) => void;

  beforeLeave?: (...arr: any[]) => void;
  afterLeave?: (...arr: any[]) => void;
}

export default ({
  on, off,
}: Options, reactNode: React.ReactNode | null, events: Events = {}) => {
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

  let endCallback = () => {}

  useEffect(() => {
    if (render) {
      setNode(reactNode)
      if (events.beforeEnter) events.beforeEnter()
      endCallback = () => {
        if (events.afterEnter) events.afterEnter()
      }
    } else {
      if (events.beforeLeave) events.beforeLeave()
      endCallback = () => {
        if (events.afterLeave) events.afterLeave()
        setNode(null)
        removeOnNextRender(false)
      }
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
          useNativeDriver: false,
          duration: events.duration || 200,
        }
      ).start(endCallback)
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


