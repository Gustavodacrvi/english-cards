

import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';


import React from 'react'
import { Animated } from 'react-native'

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
  }
  
  secondaryColor: string = '#FFD166'
  primaryColorAnimationValue: Animated.Value
  secondaryColorAnimationValue: Animated.Value

  constructor(props) {
    super(props)

    this.primaryColorAnimationValue = new Animated.Value(0)
    this.secondaryColorAnimationValue = new Animated.Value(0)

/*     const {color, primaryColor, secondaryColor} = props

    const obj: any = {}

    if (color) {
      obj.newPrimaryColor = color
      obj.secondaryColor = color
    } else {
      if (primaryColor)
        obj.newPrimaryColor = primaryColor
      if (secondaryColor)
        obj.secondaryColor = secondaryColor
    }

    if (Object.keys(obj).length)
      this.setState(obj)

    // this.setPrimaryColor(this.state.newPrimaryColor)

    this.primaryColorAnimation(false) */
    // this.secondaryColorAnimation(false)
  }

  componentDidUpdate() {
    const {primaryColor} = this.props

    if (primaryColor && primaryColor !== this.state.newPrimaryColor) {
      this.setPrimaryColor(primaryColor)
    }
  }

  setPrimaryColor = (newColor: string) => {
    this.setState({
      oldPrimaryColor: this.state.newPrimaryColor,
      newPrimaryColor: newColor,
    }, () => this.primaryColorAnimation(true))
  }

  primaryColorAnimation = (animation: boolean = true) => {
    this.primaryColorAnimationValue.setValue(0);

    
    Animated.timing(
      this.primaryColorAnimationValue,
      {
        toValue: 1,
        useNativeDriver: false,
        duration: animation ? 150 : 0,
      }
    ).start()
  }
  secondaryColorAnimation = () => {
    this.secondaryColorAnimationValue.setValue(0);

    Animated.timing(
      this.secondaryColorAnimationValue,
      {
        toValue: 1,
        useNativeDriver: true,
        duration: 20000,
      }
    ).start()
  }
  
  render() {
    const {
      width = 32,
    } = this.props

    const primaryColorConfig = this.primaryColorAnimationValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [this.state.oldPrimaryColor, this.state.newPrimaryColor]
      })

    return (
      <Svg height={width} width={width} viewBox="0 0 100 100">
        <AnimatedRect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill={primaryColorConfig}
        />
      </Svg>
    );
  }
}
