

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

import globalStyles from "./../../styles"
import { primary } from './../../styles/colors'

import { Icon } from './../../interfaces'

interface ButtonProps {
  name: string;
  type?: 'button';
  icon?: Icon;
}

function Button({
  name,
}: ButtonProps) {
  return (
    <TouchableNativeFeedback
      useForeground={true}
    >
      <View style={[
        s.Button,
/*         {
          backgroundColor: color,
        }, */
      ]}>
        <Text style={s.Text}> {name} </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const s = StyleSheet.create({
  Button: {
    padding: 10,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
  },
  Text: {
    fontSize: 18,
  },
})

export default Button
