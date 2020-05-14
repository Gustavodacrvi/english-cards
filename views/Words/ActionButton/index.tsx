

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { primary, backgroundColor } from '../../../styles/colors'
import Icon from '../../../components/Icon'

interface Props {
  active: boolean;
}

function ActionButton({active}: Props) {
  return (
    <View
      style={s.ActionButton}
    >
      <View
        style={s.Wrapper}
      >
        <View
          style={s.Ball}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(backgroundColor, false)}
            useForeground={true}
          >
            <View
              style={s.IconWrapper}
            >
              <Icon
                icon="plus"
                color={backgroundColor}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  ActionButton: {
    position: 'absolute',
    height: 60,
    width: 77,
    bottom: 73,
    right: 0,
  },
  Wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  Ball: {
    position: 'absolute',
    left: 0,
    borderRadius: 80,
    width: 56,
    overflow: 'hidden',
    height: 56,
    backgroundColor: primary,
  },
  IconWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default React.memo(ActionButton)
