

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

import {animateOnOff, animateProperty} from './../../animations/'
import { primary } from '../../styles/colors'

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
  const [isTouching, setTouch] = useState(false)

  return (
    <TouchableNativeFeedback
      ref={ref}
      useForeground={true}

      background={TouchableNativeFeedback.Ripple(primary, false)}
      onPress={click}
      delayPressIn={0}
      delayPressOut={0}
      onPressIn={() => setTouch(true)}
      onPressOut={() => setTouch(false)}
    >
      <Animated.View
        style={[s.Wrapper,{
          backgroundColor,
          borderRadius: 8,
          borderWidth: 3,
          borderColor,
        }, {
          transform: [
            {
              scale: animateProperty(isTouching ? .95 : 1, true)
            }
          ]
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
          }, icon ? iconNode : null, {}, {
            bounciness: 0,
            speed: 12,
          } as any) : iconNode}
        </View>
      </Animated.View>
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

export default React.memo(ButtonRenderer)
