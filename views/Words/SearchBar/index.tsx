

import React from 'react'
import { View, TouchableNativeFeedback } from 'react-native'

import Input from './Input'
import Icon from '../../../components/Icon'
import { primary } from '../../../styles/colors'

function SearchBar() {
  return (
    <View
      style={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Input/>
      <View
        style={{
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={true}
        >
          <View
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 8,
              paddingLeft: 8,
            }}
          >
            <Icon
              icon='sort'
              width={25}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default React.memo(SearchBar)
