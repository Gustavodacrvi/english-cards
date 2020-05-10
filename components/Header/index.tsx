

import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { backgroundColor } from '../../styles/colors'

import NavOption from './NavOption'
import { StackHeaderProps } from '@react-navigation/stack'

function Header(props: StackHeaderProps) {

  return (
    <View
      style={s.Header}
    >
      <View
        style={s.Wrapper}
      >

        <NavOption
          active={props.scene.route.name === "Home"}
          displayName="Início"
          textWidth={58}
          icon={{icon: 'home'}}
          />
        <NavOption
          active={props.scene.route.name === "Words"}
          displayName="Palavras"
          textWidth={88}
          icon={{icon: 'words'}}
          />
        <NavOption
          active={props.scene.route.name === "Profile"}
          displayName="Perfil"
          textWidth={58}
          icon={{icon: 'user'}}
        />
        
      </View>
    </View>
  )
}

const height = 73

const s = StyleSheet.create({
  Header: {
    position: 'absolute',
    width: '100%',
    height,
    top: Dimensions.get('window').height - height,
    backgroundColor,
  },
  Wrapper: {
    paddingLeft: 37,
    paddingRight: 37,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})

export default Header

