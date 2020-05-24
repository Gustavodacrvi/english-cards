

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Circle from './Circle'

function ContentButtons({
  tab,
  setTab,
} : {
  tab: 'saved' | 'review' | 'forgotten';
  setTab: (tab: 'saved' | 'review' | 'forgotten') => void;
}) {

  return (
    <View
      style={s.ContentButtons}
    >
      <View
        style={s.Wrapper}
      >

        <Circle
          icon={{icon: 'saved'}}
          setTab={setTab}
          active={tab === 'saved'}
          number={4}
        />
        <Circle
          icon={{icon: 'notification'}}
          setTab={setTab}
          active={tab === 'review'}
          isMiddle={true}
        />
        <Circle
          icon={{icon: 'notification-dash'}}
          setTab={setTab}
          active={tab === 'forgotten'}
        />

      </View>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ContentButtons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 58,
  },
})

export default React.memo(ContentButtons)
