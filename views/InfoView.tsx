
import React  from 'react'
import { View, StyleSheet, Text } from "react-native"

import { backgroundColor, primary } from '../styles/colors'

interface Props {
  hero: string;
  normal: string;
}

function InfoView({
  hero, normal,
}: Props) {

  return () => (
    <View
      style={s.Wrapper}
    >
      <Text
        style={s.Hero}
      >
        { hero }
      </Text>
      <Text
        style={s.Normal}
      >
        { normal }
      </Text>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    backgroundColor,
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  Hero: {
    fontSize: 28,
    color: primary,
    marginBottom: 30,
    fontFamily: 'OpenSans-Bold',
  },
  Normal: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 13,
  },
})

export default InfoView
