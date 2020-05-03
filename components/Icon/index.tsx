

import iconRenderer from "./iconRenderer"

import React from 'react'
import { Animated } from 'react-native'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

interface IconProps {
  width?: number;
  color?: string;
  primaryColor?: string;
  secondaryColor?: string;
  icon: 'home';
}

const DEFAULT_PRIMARY_COLOR = '#fff'
const DEFAULT_SECONDARY_COLOR = '#FFD166'

export default class Icon extends React.Component<IconProps> {
  state = {
    oldPrimaryColor: DEFAULT_PRIMARY_COLOR,
    newPrimaryColor: DEFAULT_PRIMARY_COLOR,
    newSecondaryColor: DEFAULT_SECONDARY_COLOR,
    oldSecondaryColor: DEFAULT_SECONDARY_COLOR,
  }
  
  primaryColorAnimationValue: Animated.Value
  secondaryColorAnimationValue: Animated.Value

  constructor(props) {
    super(props)

    this.primaryColorAnimationValue = new Animated.Value(0)
    this.secondaryColorAnimationValue = new Animated.Value(0)

    const {color, primaryColor, secondaryColor} = this.props

    this.state.newPrimaryColor = color || primaryColor || DEFAULT_PRIMARY_COLOR
    this.state.oldPrimaryColor = color || primaryColor || DEFAULT_PRIMARY_COLOR

    this.state.oldSecondaryColor = color || secondaryColor || DEFAULT_SECONDARY_COLOR
    this.state.oldSecondaryColor = color || secondaryColor || DEFAULT_SECONDARY_COLOR
  }

  componentDidUpdate() {
    const {primaryColor, secondaryColor, color} = this.props

    const newPrimary = color || primaryColor
    const newSecondary = color || secondaryColor

    if (newPrimary && newPrimary !== this.state.newPrimaryColor) {
      this.setPrimaryColor(newPrimary)
    }

    if (newSecondary && newSecondary !== this.state.newSecondaryColor) {
      this.setPrimaryColor(newSecondary)
    }
  }

  setPrimaryColor(newColor: string) {
    this.setState({
      oldPrimaryColor: this.state.newPrimaryColor,
      newPrimaryColor: newColor,
    }, () => {
      this.primaryColorAnimationValue.setValue(0);

      Animated.timing(
        this.primaryColorAnimationValue,
        {
          toValue: 1,
          useNativeDriver: false,
          duration: 1000,
        }
      ).start()
    })
  }
  setSecondaryColor(newColor: string) {
    this.setState({
      oldSecondaryColor: this.state.newSecondaryColor,
      newSecondaryColor: newColor,
    }, () => {
      this.secondaryColorAnimationValue.setValue(0);

      Animated.timing(
        this.secondaryColorAnimationValue,
        {
          toValue: 1,
          useNativeDriver: false,
          duration: 1000,
        }
      ).start()
    })
  }
  
  render() {
    const {
      width = 32,
      icon,
    } = this.props

    return <AnimatedIconRenderer
      width={width}
      icon={icon}

      primaryColor={this.primaryColorAnimationValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [this.state.oldSecondaryColor, this.state.newSecondaryColor]
      })}
      secondaryColor={this.primaryColorAnimationValue.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [this.state.oldPrimaryColor, this.state.newPrimaryColor]
        })}
    />
  }
}
