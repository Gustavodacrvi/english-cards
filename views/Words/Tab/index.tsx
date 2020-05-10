

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { darkBackgroundColor } from '../../../styles/colors'
import TabOption from './TabOption'

interface Props {
  tab: 'saved' | 'learned' | 'forgotten';
}

function TabWrapper({tab}: Props) {
  return (
    <View
      style={s.Wrapper}
    >
      <TabOption
        active={tab === "saved"}
        name="Salvas"
        textWidth={50}
        icon={{icon: 'saved'}}
        />
      <TabOption
        active={tab === "learned"}
        name="Aprendidas"
        textWidth={83}
        icon={{icon: 'book'}}
        />
      <TabOption
        active={tab === "forgotten"}
        name="Esquecidas"
        textWidth={86}
        icon={{icon: 'notification-dash'}}
      />

    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    backgroundColor: darkBackgroundColor,
    height: 35,
    borderRadius: 8,
    padding: 4,
    display: 'flex',
    flexDirection: 'row',
  },
})

export default React.memo(TabWrapper)
