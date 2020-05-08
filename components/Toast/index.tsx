

import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet, TouchableNativeFeedback   } from "react-native"

import { backgroundColor, primary, red, green } from './../../styles/colors'
import { ToastContext } from "../../contexts/toast"

import { animateOnOff } from './../../animations'

let toastTimeout = null

function Toast() {
  const {toast, pushToast} = useContext(ToastContext)

  if (toast) {

    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }
    
    toastTimeout = setTimeout(() => pushToast(null), toast.duration)
  }

  
  const removeToast = () => {
    if (toastTimeout)
      clearTimeout(toastTimeout)
    
    console.log((toast && toast.msg) || null)
    
    if (toast)
      pushToast(null)
  }

  return (
    <View
      style={[
        s.Wrapper,
      ]}
    >
      {animateOnOff({
        off: {
          translateX: 500,
        },
        on: {
          translateX: 0,
        },
      }, toast ? (
        <View
          style={s.TouchableWrapper}
        >
          <TouchableNativeFeedback
            useForeground={true}
            background={TouchableNativeFeedback.Ripple("#fff", false)}
            onPress={removeToast}
          >
            <View
              style={[s.Toast, toast ? s[toast.type] : undefined,]}
            >
              <Text style={s.Text}>{ toast ? toast.msg : undefined }</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        ) : null, {useNativeDriver: true})}
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
  TouchableWrapper: {
    marginLeft: 19,
    marginRight: 19,
    borderRadius: 8,
    overflow: 'hidden',
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
    borderColor: green,
  },
})

export default Toast
