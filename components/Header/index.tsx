

import React, { useState, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { backgroundColor } from '../../styles/colors'

import NavOption from './NavOption'
import { StackHeaderProps } from '@react-navigation/stack'
import { IconInterface } from '../../interfaces'

function Header(props: StackHeaderProps) {

  const tabHeight = useRef(73)
  
  const [height, setHeight] = useState(Dimensions.get('window').height - tabHeight.current)

  const home = useRef({icon: 'home'} as IconInterface)
  const words = useRef({icon: 'words'} as IconInterface)
  const user = useRef({icon: 'archive'} as IconInterface)

  const GoToHome = useRef(() => props.navigation.navigate('Home')) 
  const GoToWords = useRef(() => props.navigation.navigate('Words')) 
  const GoToArchived = useRef(() => props.navigation.navigate('Archived')) 

  return (
    <View
      style={[
        s.Header,
        {
          top: height,
        },
      ]}
      onLayout={evt => {
        setHeight(Dimensions.get('window').height - tabHeight.current)
      }}
    >
      <View
        style={s.Wrapper}
      >

        <NavOption
          active={props.scene.route.name === "Home"}
          displayName="Início"
          textWidth={58}
          icon={home.current}
          onPress={GoToHome.current}
          />
        <NavOption
          active={props.scene.route.name === "Words"}
          displayName="Palavras"
          textWidth={88}
          icon={words.current}
          onPress={GoToWords.current}
          />
        <NavOption
          active={props.scene.route.name === "Archived"}
          displayName="Guardadas"
          textWidth={88}
          icon={user.current}
          onPress={GoToArchived.current}
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

