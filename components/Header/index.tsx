

import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { backgroundColor } from '../../styles/colors'

import NavOption from './NavOption'
import { StackHeaderProps } from '@react-navigation/stack'

function Header(props: StackHeaderProps) {

  const tabHeight = 73
  
  const [height, setHeight] = useState(Dimensions.get('window').height - tabHeight)

  return (
    <View
      style={[
        s.Header,
        {
          top: height,
        },
      ]}
      onLayout={evt => {
        setHeight(Dimensions.get('window').height - tabHeight)
      }}
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

const s = StyleSheet.create({
  Header: {
    position: 'absolute',
    width: '100%',
    height: 73,
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

