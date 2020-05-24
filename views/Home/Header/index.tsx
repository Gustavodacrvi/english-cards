

import React from 'react'

import HeaderIcons from './HeaderIcons'
import { View } from 'react-native'

import SvgHomeBackground from '../SvgHomeBackground'
import HeaderContent from './HeaderContent'

function Header({
  toggleMenu,
  tab,
  setTab,
  isMenuOpened,
} : {
  tab: 'saved' | 'review' | 'forgotten';
  setTab: (tab: 'saved' | 'review' | 'forgotten') => void;
  toggleMenu: () => void;
  isMenuOpened: boolean;
}) {

  return (
    <View>

      <SvgHomeBackground/>
      <HeaderIcons
        isMenuOpened={isMenuOpened}
        toggleMenu={toggleMenu}
      />

      <HeaderContent
        isMenuOpened={isMenuOpened}
        tab={tab}
        setTab={setTab}
      />

    </View>
  )
}

export default React.memo(Header)
