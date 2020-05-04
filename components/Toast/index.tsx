

import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"

import { backgroundColor, primary, red } from './../../styles/colors'
import { ToastContext } from "../../contexts/toast"

function Toast() {
  const {toast} = useContext(ToastContext)

  console.log(toast)
  
  return (
    <View
      style={[
        s.Wrapper,
      ]}
    >
      <View style={[s.Toast, toast ? s[toast.type] : undefined,]}>
        <Text style={s.Text}>{ toast.msg }</Text>
      </View>
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
