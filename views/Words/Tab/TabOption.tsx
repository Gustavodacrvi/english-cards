
import React from 'react'

import { View, Text, StyleSheet, Animated } from 'react-native'
import { IconInterface } from '../../../interfaces'
import Icon from '../../../components/Icon'
import { darkBackgroundColor, primary } from '../../../styles/colors'
import { animateProperty } from '../../../animations'

interface Props {
  active: boolean;
  name: string;
  textWidth: number;
  icon: IconInterface;
}

function TabOption({active, name, icon, textWidth}: Props) {
  return (
    <View
      style={[
        s.Wrapper,
        {
          flex: active ? 2 : 1,
        }
      ]}
    >
      <Animated.Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[
          s.Text,
          {
            width: animateProperty(active ? textWidth : 0),
          },
        ]}
      >
        {name}
      </Animated.Text>
      <Icon {...icon} width={18}/>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: 'OpenSans-Bold.ttf',
    fontSize: 16,
    overflow: 'hidden',
    marginRight: 8,
    // color: darkBackgroundColor,
  }
})

export default React.memo(TabOption)
