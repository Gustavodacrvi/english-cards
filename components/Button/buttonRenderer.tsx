

import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
} from 'react-native'

import React from 'react'
const AnimatedTouchableNative = Animated.createAnimatedComponent(TouchableNativeFeedback)

export default class ButtonRenderer extends React.Component<{
  backgroundColor: string;
  borderColor: string;
  color: string;
  name: string;
}> {
  render() {
    const {
      backgroundColor,
      name,
      color,
      borderColor,
    } = this.props
    
    return (
      <AnimatedTouchableNative
      useForeground={true}
    >
      <View style={[
        s.Button,
        {
          backgroundColor,
          borderRadius: 8,
          borderWidth: 3,
          borderColor,
        },
      ]}>
        <Text style={[s.Text, {color}]}> {name} </Text>
      </View>
    </AnimatedTouchableNative>
    )
  }
}

const s = StyleSheet.create({
  Button: {
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
  },
  Text: {
    fontSize: 18,
  },
})

