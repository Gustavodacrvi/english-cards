

import React from 'react'
import { View, Text, StyleSheet } from "react-native"

import { backgroundColor } from './../styles/colors'
import Input from '../components/Input'

function Authentication() {
  return (
    <View style={s.Auth}>
      <View style={s.Wrapper}>

        <Input
          placeholder="Nome de usuário:"
        />

      </View>
    </View>
  )
}

const s = StyleSheet.create({
  Auth: {
    backgroundColor,
    height: '100%',
    alignItems: 'center',
  },
  Wrapper: {
    height: 30,
    width: 268,
    marginTop: 190,
  },
})

export default Authentication
