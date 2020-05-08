
import React from 'react'
import { View, StyleSheet } from "react-native"

import Icon from '../components/Icon'
import { backgroundColor, primary } from '../styles/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

function ModalHeader({navigation}) {
  return (
    <View
      style={[s.Wrapper, {
        backgroundColor,
      }]}
    >
      <View
        style={s.Icon}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          style={s.Touchable}
          onPress={navigation.goBack}
        >
          <Icon
            icon="arrow"
          />
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    height: 65,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'red',
  },
  Icon: {
    transform: [
      {
        rotate: '180deg',
      }
    ],
    borderRadius: 8,
    overflow: 'hidden',
    width: 47,
  },
  Touchable: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
})

export default ModalHeader
