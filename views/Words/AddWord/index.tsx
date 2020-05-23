

import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { primary, faded, backgroundColor, darkBackgroundColor } from '../../../styles/colors'
import { inputHandler } from '../../../utils'
import ButtonComp from '../../../components/Button/'
import NetInfo from '@react-native-community/netinfo'
import AnimationComp, { AnimationProps } from './Animation'

interface AnimationOptions {
  [key: string]: AnimationProps,
}

function AddWord() {

  const animationOptions = useRef({
    noNet: {
      icon: {
        icon: 'wifi',
      },
      text: 'Sem internet',
    },
    empty: {
      icon: {
        icon: 'search',
      },
      text: 'Começe a digitar para encontrar a palavra.',
    },
    waiting: {
      icon: {
        icon: 'search',
      },
      text: 'Esperando terminar de digitar.',
    },
    translating: {
      icon: {
        icon: 'loading',
        rotate: true,
      },
      text: 'Traduzindo...',
    },
    error: {
      icon: {
        icon: 'alert',
        rotate: true,
      },
      text: 'Houve algum erro ao traduzir, a palavra pode não existir...',
    },
  } as AnimationOptions)
  const input = useRef()
  inputHandler(input)

  const setSearch = () => {}

  const [isBlocked, setBlock] = useState(true)
  const [type, setType] = useState('empty' as 'empty' | 'waiting' | 'translating' | 'error')
  const [isConnected, setConnect] = useState(true)

  useEffect(() => {
    NetInfo.addEventListener(net => setConnect(net.isConnected))
  })
  
  return (
    <View style={s.AddWord}>
      <View
        style={s.InputWrapper}
      >
        <TextInput
          ref={input}
          style={{
            color: '#fff',
            marginRight: 5,
            flex: 1,
            height: 45,
            fontSize: 16,
            fontFamily: 'OpenSans-Semibold',
          }}

          selectionColor={primary}
          placeholderTextColor={faded}
          placeholder='Pesquisar...'
          onChangeText={setSearch}
        />
      </View>

      <AnimationComp
        {...(
          animationOptions.current[!isConnected ? 'noNet' : type]
        )}
      />
      
      <ButtonComp
        name="Salvar palavra"
        type={isBlocked ? 'blocked' : 'default'}
      />
        
    </View>
  )
}

const s = StyleSheet.create({
  AddWord: {
    backgroundColor,
    width: 325,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: darkBackgroundColor,
  },
  InputWrapper: {
    backgroundColor: darkBackgroundColor,
    height: 45,
    paddingLeft: 14,
  },
})

export default React.memo(AddWord)
