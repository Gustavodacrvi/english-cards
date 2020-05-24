

import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { AuthContext } from '../../../../contexts/auth'
import { primary } from '../../../../styles/colors'

function HeaderIcons({
  isMenuOpened,
}: {
  isMenuOpened: boolean;
}) {

  const {user} = useContext(AuthContext)

  return (
    <Text
      style={s.Title}
    >
      {(!isMenuOpened && "English Cards") || (user && user.email)}
    </Text>
  )
}

const s = StyleSheet.create({
  Title: {
    color: primary,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
})

export default React.memo(HeaderIcons)
