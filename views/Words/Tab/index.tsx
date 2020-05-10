

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { darkBackgroundColor } from '../../../styles/colors'

interface Props {
  tab: 'saved' | 'learned' | 'forgotten';
}

function TabWrapper({tab}: Props) {
  return (
    <View
      style={s.Wrapper}
    >

    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    backgroundColor: darkBackgroundColor,
    height: 35,
    borderRadius: 8,
    padding: 4,
  },
})

export default React.memo(TabWrapper)
