

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface ButtonProps {
  name: string;
}

export default class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <View style={s.Button}>
        <Text>
          {this.props.name}
        </Text>
      </View>
    )
  }
}

const s = StyleSheet.create({
  Button: {

  },
})
