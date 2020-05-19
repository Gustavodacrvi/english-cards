

import React from 'react'
import Icon from '../../components/Icon'
import { View, StyleSheet } from 'react-native'

function ListLoading() {
  return (
    <View
      style={s.ListLoading}
    >
      <Icon
        icon='loading'
        width={75}
        rotate={true}
      />
    </View>
  )
}

const s = StyleSheet.create({
  ListLoading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ListLoading
