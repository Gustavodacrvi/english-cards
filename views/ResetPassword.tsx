
import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text } from "react-native"

import Icon from '../components/Icon'
import { backgroundColor } from '../styles/colors'
import FormWrapper from './Authentication/FormWrapper'
import Input from '../components/Input'
import Button from '../components/Button'
import { ToastContext } from '../contexts/toast'
import { AuthContext } from '../contexts/auth'

function ResetPassword() {

  const {success, error} = useContext(ToastContext)
  const {sendResetEmail} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [isLoading, setLoading] = useState(false)

  const disable = !email.length
  
  const click = async () => {
    console.log(disable)
    if (disable)
      return error('Preencha os campos!')

    setLoading(true)

    try {
      await sendResetEmail(email)
      success('E-mail mandado com sucesso!')
      setEmail("")
      setLoading(false)
    } catch (err) {
      error(err)
      setLoading(false)
    }
  }
  
  return (
    <FormWrapper
      margin={-30}
    >
      {({moveFormUp}) => (
        <View>

          <Input
            placeholder="E-mail:"
            onFocus={() => moveFormUp(true)}
            value={email}
            onChangeText={setEmail}
          />
          <View style={{
            marginTop: 12,
          }}>
            <Button
              name="Mandar e-mail"
              type={disable ? "slides" : "white"}
              click={click}
              icon={isLoading ? {
                icon: 'loading'
              } : null}
            />
          </View>
          
        </View>
        
      )}
    </FormWrapper>
  )
}

const s = StyleSheet.create({
})

export default ResetPassword
