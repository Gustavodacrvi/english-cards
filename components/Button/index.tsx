

import React, { useState, useEffect } from 'react'
import {
  Animated,
} from 'react-native'

import { primary, backgroundColor, red } from './../../styles/colors'

import { IconInterface } from './../../interfaces'

import ButtonRenderer from './buttonRenderer'

import ColorAnimation from '../../animations/colors'

const AnimatedButtonRenderer = Animated.createAnimatedComponent(ButtonRenderer)

interface ButtonProps {
  name: string;
  type?: 'default' | 'white' | 'slides' | 'cancel';
  blocked?: boolean;
  icon?: IconInterface;
}

function Button({
  name,
  type = 'default',
  blocked,
  icon,
}: ButtonProps) {
  const key = blocked ? 'blocked' : type

  const iconWidth = 22

  return <AnimatedButtonRenderer
    name={name}

    icon={icon}
    iconWidth={iconWidth}

    textColor={ColorAnimation({
      default: '#fff',
      white: backgroundColor,
      slides: '#fff',
      cancel: '#fff',
    }[key])}
    borderColor={ColorAnimation({
      default: primary,
      white: '#fff',
      slides: '#fff',
      cancel: red,
    }[key])}
    backgroundColor={ColorAnimation({
      default: primary,
      white: '#fff',
      slides: backgroundColor,
      cancel: red,
    }[key])}
  />
}

export default Button
