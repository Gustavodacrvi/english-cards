

import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"

import { backgroundColor, primary, red } from './../../styles/colors'
import { ToastContext } from "../../contexts/toast"

import { enterLeaveTransition } from './../../animations'

function Toast() {
  const {toast, pushToast} = useContext(ToastContext)

  if (toast) {
    setTimeout(() => pushToast(null), toast.duration)
  }

  return (
    <View
      style={[
        s.Wrapper,
      ]}
    >
      {enterLeaveTransition({
        off: {
          translateX: 500,
        },
        on: {
          translateX: 0,
        },
      }, toast ? <View style={[s.Toast, toast ? s[toast.type] : undefined,]}>
          <Text style={s.Text}>{ toast ? toast.msg : undefined }</Text>
        </View> : null, {useNativeDriver: true})}
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  Toast: {
    backgroundColor,
    padding: 19,
    borderRadius: 8,
    borderWidth: 3,
  },
  Text: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  error: {
    borderColor: red,
  },
  success: {
    borderColor: primary,
  },
})

export default Toast
