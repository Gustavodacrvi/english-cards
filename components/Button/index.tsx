

import React from 'react'
import {
  Animated,
} from 'react-native'

import { primary, backgroundColor, red, faded } from './../../styles/colors'


import ButtonRenderer from './buttonRenderer'

import { IconInterface } from './../../interfaces'
import { animateProperty } from '../../animations/'

const AnimatedButtonRenderer = Animated.createAnimatedComponent(ButtonRenderer)

interface ButtonProps {
  name: string;
  type?: 'default' | 'white' | 'slides' | 'cancel' | 'blocked';
  blocked?: boolean;
  disableIconTransition?: boolean;
  icon?: IconInterface;
  click?: () => void;
}

function Button({
  name,
  type = 'default',
  blocked,
  icon,
  disableIconTransition = false,
  click = (() => {}),
}: ButtonProps) {
  const key = type

  const iconWidth = 22

  return <AnimatedButtonRenderer
    name={name}
    click={!blocked ? click : (() => {})}

    icon={icon}
    iconWidth={iconWidth}
    disableIconTransition={disableIconTransition}

    textColor={animateProperty({
      default: '#fff',
      white: backgroundColor,
      slides: '#fff',
      cancel: '#fff',
      blocked: '#fff',
    }[key])}
    borderColor={animateProperty({
      default: primary,
      white: '#fff',
      slides: '#fff',
      cancel: red,
      blocked: faded,
    }[key])}
    backgroundColor={animateProperty({
      default: primary,
      white: '#fff',
      slides: backgroundColor,
      cancel: red,
      blocked: faded,
    }[key])}
  />
}

export default React.memo(Button)
