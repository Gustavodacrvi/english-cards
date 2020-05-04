

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

import {enterLeaveTransition} from './../../animations/'

const AnimatedTouchableNative = Animated.createAnimatedComponent(TouchableNativeFeedback)

interface Props {
  backgroundColor: string;
  name: string;
  icon?: IconInterface;
  borderColor: string;
  textColor: string;
  iconWidth: number;
}

const ButtonRenderer = forwardRef(({
  backgroundColor,
  borderColor,
  name,
  icon,
  textColor,
  iconWidth,
}: Props, ref: any) => {

  return (
    <AnimatedTouchableNative
      ref={ref}
      useForeground={true}
    >
      <View>
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
            {enterLeaveTransition({
              off: {
                width: 0,
                opacity: 0,
              },
              on: {
                width: iconWidth,
                opacity: 1,
              },
            }, icon ? <Icon {...icon} rotate={true}/> : null)}
          </View>
        </View>
      </View>
    </AnimatedTouchableNative>
  )
})

const s = StyleSheet.create({
  Wrapper: {
    alignItems: 'center',
  },
  Button: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Text: {
    fontSize: 18,
  },
})

export default ButtonRenderer