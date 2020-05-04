

import { useState, useEffect } from 'react'
import { Animated } from 'react-native'

export default function(color: string, duration: number = 200) {
  const [shouldRunInThisRender, runOnNextRender] = useState(false)
  const [{
    oldColor,
    newColor,
  }, setColors] = useState({
    oldColor: color,
    newColor: color,
  })

  const [animation] = useState(new Animated.Value(0))
  
  if (shouldRunInThisRender) {
    runOnNextRender(false)
    animation.setValue(0)
  
    Animated.timing(
      animation,
      {
        toValue: 1,
        useNativeDriver: false,
        duration,
      }
    ).start()
  }

  useEffect(() => {
    setColors({
      oldColor: newColor,
      newColor: color,
    })
    runOnNextRender(true)
  }, [color])
  
  return animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldColor, newColor]
    })
}
