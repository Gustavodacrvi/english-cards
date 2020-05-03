

import { useState, useEffect } from 'react'
import { Animated } from 'react-native'

export default function(color: string, dependencyList?: React.DependencyList, duration: number = 200) {
  const [value, setValue] = useState(false)
  const [{
    oldColor,
    newColor,
  }, setColors] = useState({
    oldColor: color,
    newColor: color,
  })

  const [animation] = useState(new Animated.Value(0))
  
  useEffect(() => {
    if (value) {
      setValue(false)
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
  })

  useEffect(() => {
    setColors({
      oldColor: newColor,
      newColor: color,
    })
    setValue(true)
  }, dependencyList || [color])

  return animation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [oldColor, newColor]
    })
}
