

import React, { useRef } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View } from 'react-native'
import { inputHandler } from '../../../utils'

import { darkBackgroundColor, faded, primary } from '../../../styles/colors'
import Icon from '../../../components/Icon'

function Input() {
  
  const input = useRef(null)

  inputHandler(input)
  
  return (
    <View
      style={{
        backgroundColor: darkBackgroundColor,
        height: 35,
        borderRadius: 8,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          paddingLeft: 8,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Icon
          icon='search'
          width={18}
        />
        <TextInput
          ref={input}
          style={{
            color: '#fff',
            marginLeft: 5,
            marginRight: 5,
            flex: 1,
            transform: [
              {
                translateY: 3,
              }
            ]
          }}

          selectionColor={primary}
          placeholder='Pesquisar...'
          placeholderTextColor={faded}
        />
      </View>
    </View>
  )
}

export default Input
