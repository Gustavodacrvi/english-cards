

import React from 'react'

import HeaderIcons from './HeaderIcons'
import { View } from 'react-native'

import SvgHomeBackground from '../SvgHomeBackground'
import HeaderContent from './HeaderContent'

function Header({
  toggleMenu,
  isMenuOpened,
} : {
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
      />

    </View>
  )
}

export default React.memo(Header)
