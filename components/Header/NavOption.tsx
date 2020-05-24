

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
  onPress: () => void;
}

function NavOption({
  active,
  icon,
  displayName,
  textWidth,
  onPress,
}: Props) {
  return (
    <View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <TouchableNativeFeedback
        style={[
          s.NavOption,
          {
            borderColor: active ? 'white' : 'transparent',
          },
        ] as any}
        useForeground={true}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(primary, false)}
      >

        <Icon {...icon} width={28}/>
        <View
          style={[
            s.TextWrapper,
            active ? {
              opacity: 1,
              width: textWidth,
            } : {
              opacity: 0,
              width: 0,
            }
          ]}
        >
          <Text
            style={s.Text}
            ellipsizeMode="clip"
            numberOfLines={1}
          > {displayName} </Text>
        </View>
      
      </TouchableNativeFeedback>
    </View>
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
