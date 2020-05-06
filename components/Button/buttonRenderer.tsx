

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

import {animateOnOff} from './../../animations/'

interface Props {
  backgroundColor: string;
  name: string;
  disableIconTransition: boolean;
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
  disableIconTransition = false,
}: Props, ref: any) => {
  const iconNode = <Icon color={textColor} width={iconWidth} rotate={true} {...icon}/>
  
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
          {!disableIconTransition ? animateOnOff({
            off: {
              width: 0,
              opacity: 0,
            },
            on: {
              width: iconWidth,
              opacity: 1,
            },
          }, icon ? iconNode : null, {duration: 500}, null) : iconNode}
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
