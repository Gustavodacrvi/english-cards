




import React, { useState, useContext } from 'react'
import { View} from 'react-native'

import FormWrapper from './Authentication/FormWrapper'
import Button from '../components/Button'
import Input from '../components/Input'
import { ToastContext } from '../contexts/toast'
import { AuthContext } from '../contexts/auth'

function ChangeEmail() {

  const {success, error} = useContext(ToastContext)
  const {changeEmail} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [isLoading, setLoading] = useState(false)
  
  const disable = !email.length

  const click = async () => {
    if (disable)
      return error('Preencha os campos!')

    setLoading(true)

    try {
      await sendResetEmail(email)
      success('E-mail atualizado com sucesso!')
      setEmail("")
      setLoading(false)
    } catch (err) {
      error("Houve algum erro ao tentar atualizar o e-mail.")
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
            name="Mudar e-mail"
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

export default ChangeEmail
