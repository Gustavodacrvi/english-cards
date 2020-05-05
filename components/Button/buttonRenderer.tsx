

import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
} from 'react-native'

import { IconInterface } from './../../interfaces'

import React, { useEffect, forwardRef, useState } from 'react'
import Icon from './../Icon'

import {animateEnterLeave} from './../../animations/'

interface Props {
  backgroundColor: string;
  name: string;
  icon?: IconInterface;
  borderColor: string;
  textColor: string;
  iconWidth: number;
  click: () => void;
}

const ButtonRenderer = forwardRef(({
  backgroundColor,
  borderColor,
  name,
  icon,
  textColor,
  iconWidth,
  click,
}: Props, ref: any) => {
  return (
    <TouchableNativeFeedback
      ref={ref}
      useForeground={true}

      onPress={click}
    >
      <View
        style={[s.Wrapper,{
          backgroundColor,
          borderRadius: 8,
          borderWidth: 3,
          borderColor,
        }]}
      >
        <View style={s.Button}>
          <Text style={[s.Text, {
            color: textColor,
          }]}> {name} </Text>
          {animateEnterLeave({
            off: {
              width: 0,
              opacity: 0,
            },
            on: {
              width: iconWidth,
              opacity: 1,
            },
          }, icon ? <Icon {...icon} color={textColor} width={iconWidth} rotate={true}/> : null, {duration: 500})}
        </View>
      </View>
    </TouchableNativeFeedback>
  )
})

const s = StyleSheet.create({
  Wrapper: {
    alignItems: 'center',
  },
  Button: {
    borderRadius: 8,
    height: 42,
    translateY: -.5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Text: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
})

export default ButtonRenderer
