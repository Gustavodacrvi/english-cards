

import React, { useRef } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View, TouchableNativeFeedback } from 'react-native'
import { inputHandler } from '../../../utils'

import { darkBackgroundColor, faded, primary } from '../../../styles/colors'
import Icon from '../../../components/Icon'

interface Props {
  setSearch: (search: string) => void;
}

function Input({setSearch}: Props) {
  
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
          paddingLeft: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(primary, false)}
            useForeground={true}
            onPress={() => setSearch("")}
          >
            <View
              style={{
                padding: 6,
              }}
            >
              <Icon
                icon='search'
                width={18}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <TextInput
          ref={input}
          style={{
            color: '#fff',
            marginRight: 5,
            flex: 1,
            height: 45,
            fontFamily: 'OpenSans-Semibold',
          }}

          selectionColor={primary}
          placeholder='Pesquisar...'
          placeholderTextColor={faded}
          onChangeText={setSearch}
        />
      </View>
    </View>
  )
}

export default Input
