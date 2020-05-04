

import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  Animated,
} from 'react-native'

import { primary, backgroundColor, red } from './../../styles/colors'


import ButtonRenderer from './buttonRenderer'

import { IconInterface } from './../../interfaces'
import { colorChangeDetection } from '../../animations/'
import { ToastContext } from '../../contexts/toast'

const AnimatedButtonRenderer = Animated.createAnimatedComponent(ButtonRenderer)

interface ButtonProps {
  name: string;
  type?: 'default' | 'white' | 'slides' | 'cancel';
  blocked?: boolean;
  icon?: IconInterface;
  click: () => void;
}

function Button({
  name,
  type = 'default',
  blocked,
  icon,
}: ButtonProps) {
  const key = blocked ? 'blocked' : type

  const {pushToast} = useContext(ToastContext)
  
  const push = () => {
    pushToast({
      msg: 'Preencha todos os campos.',
      type: 'success',
      duration: 2000,
    })
  }

  const iconWidth = 22

  return <AnimatedButtonRenderer
    name={name}
    click={push}

    icon={icon}
    iconWidth={iconWidth}

    textColor={colorChangeDetection({
      default: '#fff',
      white: backgroundColor,
      slides: '#fff',
      cancel: '#fff',
    }[key])}
    borderColor={colorChangeDetection({
      default: primary,
      white: '#fff',
      slides: '#fff',
      cancel: red,
    }[key])}
    backgroundColor={colorChangeDetection({
      default: primary,
      white: '#fff',
      slides: backgroundColor,
      cancel: red,
    }[key])}
  />
}

export default Button
