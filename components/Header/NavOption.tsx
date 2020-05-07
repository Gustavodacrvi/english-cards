

import React from 'react'

import { View, Text, StyleSheet, Animated } from 'react-native'

import { IconInterface } from '../../interfaces'
import Icon from '../Icon'
import { primary } from '../../styles/colors'
import { animateStyles, animateProperty } from '../../animations'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

interface Props {
  active: boolean;
  icon: IconInterface;
  displayName: string;
  textWidth: number;
}

function NavOption({
  active,
  icon,
  displayName,
  textWidth,
}: Props) {
  return (
    <Animated.View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <TouchableNativeFeedback
        style={[
          s.NavOption,
          {
            borderColor: animateProperty(active ? 'white' : 'transparent'),
          },
        ] as any}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(primary, false)}
      >

        <Icon {...icon} width={28}/>
        <Animated.View
          style={[
            s.TextWrapper,
            animateStyles(active ? {
              opacity: 1,
              width: textWidth,
            } : {
              opacity: 0,
              width: 0,
            }, false, {
              bounciness: 0,
              speed: 25,
            } as any)
          ]}
        >
          <Text
            style={s.Text}
            ellipsizeMode="clip"
            numberOfLines={1}
          > {displayName} </Text>
        </Animated.View>
      
      </TouchableNativeFeedback>
    </Animated.View>
  )
}

const s = StyleSheet.create({
  NavOption: {
    borderWidth: 1,
    padding: 8,
    display: 'flex',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  TextWrapper: {
    flexDirection: 'row',
  },
  Text: {
    fontSize: 20,
    textAlign: 'left',
    flex: 1,
    color: primary,
    fontFamily: 'OpensSans-Bold',
  },
})

export default React.memo(NavOption)
