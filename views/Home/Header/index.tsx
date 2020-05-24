

import React from 'react'

import HeaderIcons from './HeaderIcons'
import { View } from 'react-native'

import SvgHomeBackground from '../SvgHomeBackground'

function Header({
  toggleMenu,
} : {
  toggleMenu: () => void;
}) {

  return (
    <View>

      <SvgHomeBackground/>
      <HeaderIcons
        isOpened={false}
        toggleMenu={toggleMenu}
      />

    </View>
  )
}

export default React.memo(Header)
