

import Svg, {
  Rect,
} from 'react-native-svg';


import React from 'react'
import { Animated, View } from 'react-native'

const AnimatedRect = Animated.createAnimatedComponent(Rect)

interface IconProps {
  width?: number;
  color?: string | undefined;
  primaryColor?: string;
  secondaryColor?: string;
}

export default class Icon extends React.Component<IconProps> {
  state = {
    oldPrimaryColor: '#ffffff',
    newPrimaryColor: '#ffffff',
    newSecondaryColor: '#FFD166',
    oldSecondaryColor: '#FFD166',
  }
  
  secondaryColor: string = '#FFD166'
  primaryColorAnimationValue: Animated.Value
  secondaryColorAnimationValue: Animated.Value

  constructor(props) {
    super(props)

    this.primaryColorAnimationValue = new Animated.Value(0)
    this.secondaryColorAnimationValue = new Animated.Value(0)

    const {color, primaryColor, secondaryColor} = this.props

    this.state.newPrimaryColor = color || primaryColor || '#fff'
    this.state.oldPrimaryColor = color || primaryColor || '#fff'

    this.state.oldSecondaryColor = color || secondaryColor || '#FFD166'
    this.state.oldSecondaryColor = color || secondaryColor || '#FFD166'

  }

  componentDidUpdate() {
    const {primaryColor} = this.props

    if (primaryColor && primaryColor !== this.state.newPrimaryColor) {
      this.setPrimaryColor(primaryColor)
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
          duration: 150,
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
          duration: 150,
        }
      ).start()
    })
  }
  
  render() {
    const {
      width = 32,
    } = this.props


    return (
      <View>
        <Svg height={width} width={width} viewBox="0 0 100 100">
          <AnimatedRect
            x="15"
            y="15"
            width="70"
            height="70"
            strokeWidth="2"

            stroke={this.primaryColorAnimationValue.interpolate(
              {
                inputRange: [0, 1],
                outputRange: [this.state.oldSecondaryColor, this.state.newSecondaryColor]
              })}
            fill={this.primaryColorAnimationValue.interpolate(
              {
                inputRange: [0, 1],
                outputRange: [this.state.oldPrimaryColor, this.state.newPrimaryColor]
              })}
          />
        </Svg>
      </View>
    );
  }
}
