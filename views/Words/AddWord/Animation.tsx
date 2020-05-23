

import React from 'react'

import { IconInterface } from '../../../interfaces'
import { View, Text, StyleSheet } from 'react-native'
import Icon from '../../../components/Icon'

interface AnimationProps {
  icon: IconInterface;
  text: string;
}

function Animation({
  icon,
  text,
}: AnimationProps) {
  return (
    <View style={s.Wrapper}>
      <Text style={s.Text}>
        {text}
      </Text>
      <View style={s.IconWrapper}>
        <Icon {...icon} width={75} />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 14,
    marginBottom: 14,
  },
  IconWrapper: {
    marginTop: 12,
  },
  Text: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
})

export default React.memo(Animation)
