

import iconRenderer from "./iconRenderer"

import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import {Icon} from './../../interfaces'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

const DEFAULT_PRIMARY_COLOR = '#fff'
const DEFAULT_SECONDARY_COLOR = '#FFD166'

function Icon({color, primaryColor, secondaryColor, width = 32, icon}: Icon) {
  const [runSecondaryAnimation, setRunSecondaryAnimation] = useState(false)
  const [runPrimaryAnimation, setRunPrimaryAnimation] = useState(false)

  const [{
    newSecondaryColor,
    oldSecondaryColor,
  }, setSecondaryColor] = useState({
    newSecondaryColor: DEFAULT_SECONDARY_COLOR,
    oldSecondaryColor: DEFAULT_SECONDARY_COLOR,
  })
  const [{
    oldPrimaryColor,
    newPrimaryColor,
  }, setPrimaryColor] = useState({
    oldPrimaryColor: DEFAULT_PRIMARY_COLOR,
    newPrimaryColor: DEFAULT_PRIMARY_COLOR,
  })
  const [primaryColorAnimationValue] = useState(new Animated.Value(0))
  const [secondaryColorAnimationValue] = useState(new Animated.Value(0))

  useEffect(() => {
    if (runPrimaryAnimation) {
      setRunPrimaryAnimation(false)
      primaryColorAnimationValue.setValue(0);

      Animated.timing(
        primaryColorAnimationValue,
        {
          toValue: 1,
          useNativeDriver: false,
          duration: 1000,
        }
      ).start()
    }
  }, [runPrimaryAnimation])

  useEffect(() => {
    if (runSecondaryAnimation) {
      setRunSecondaryAnimation(false)
      secondaryColorAnimationValue.setValue(0);

      Animated.timing(
        secondaryColorAnimationValue,
        {
          toValue: 1,
          useNativeDriver: false,
          duration: 1000,
        }
      ).start()
    }
  }, [runSecondaryAnimation])

  useEffect(() => {
    setPrimaryColor({
      oldPrimaryColor: newPrimaryColor,
      newPrimaryColor: color || primaryColor || DEFAULT_PRIMARY_COLOR,
    })
    setRunPrimaryAnimation(true)
  }, [primaryColor, color])
  
  useEffect(() => {
    setSecondaryColor({
      oldSecondaryColor: newSecondaryColor,
      newSecondaryColor: color || secondaryColor || DEFAULT_SECONDARY_COLOR,
    })
    setRunSecondaryAnimation(true)
  }, [secondaryColor, color])

  return <AnimatedIconRenderer
    width={width}
    icon={icon}

    primaryColor={primaryColorAnimationValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [oldPrimaryColor, newPrimaryColor]
      })}
    secondaryColor={secondaryColorAnimationValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [oldSecondaryColor, newSecondaryColor]
      })}
  />

}

export default Icon

