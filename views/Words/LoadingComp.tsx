

import React from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from '../../components/Icon'

import { backgroundColor } from '../../styles/colors'

function LoadingComp({show}: {show: boolean}) {
  return (
    <View
      style={[
        s.ListLoading,
        {
          opacity: show ? 1 : 0,
        },
      ]}
      pointerEvents="none"
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
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor,
  },
})

export default React.memo(LoadingComp)
