

import React from 'react'
import { View, StyleSheet } from 'react-native'

import ContentLinks from './ContentLinks'
import HeaderTitle from './HeaderTitle'
import ContentButtons from './ContentButtons'

function isMenuOpened({
  isMenuOpened,
  tab,
  setTab,
}: {
  isMenuOpened: boolean;
  tab: 'saved' | 'review' | 'forgotten';
  setTab: (tab: 'saved' | 'review' | 'forgotten') => void;
}) {

  return (
    <View>

      <HeaderTitle
        isMenuOpened={isMenuOpened}
      />

      <View
        style={s.Wrapper}
      >
        <ContentButtons
          tab={tab}
          setTab={setTab}
        />
        <ContentLinks
          isMenuOpened={isMenuOpened}
        />
      </View>

    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    position: 'relative',
  },
})

export default React.memo(isMenuOpened)
