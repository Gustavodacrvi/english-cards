

import React from 'react'
import { View, StyleSheet } from 'react-native'

import ContentLinks from './ContentLinks'
import HeaderTitle from './HeaderTitle'

function isMenuOpened({isMenuOpened}: {isMenuOpened: boolean}) {

  return (
    <View>

      <HeaderTitle
        isMenuOpened={isMenuOpened}
      />

      <View
        style={s.Wrapper}
      >
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
