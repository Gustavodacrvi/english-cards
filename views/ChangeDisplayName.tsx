




import React, { useState, useContext } from 'react'
import { View} from 'react-native'

import FormWrapper from './Authentication/FormWrapper'
import Button from '../components/Button'
import Input from '../components/Input'
import { ToastContext } from '../contexts/toast'
import { AuthContext } from '../contexts/auth'

function ChangeDisplayName() {

  const {success, error} = useContext(ToastContext)
  const {changeDisplayName} = useContext(AuthContext)

  const [displayName, setEmail] = useState("")
  const [isLoading, setLoading] = useState(false)
  
  const disable = !displayName.length

  const click = async () => {
    if (disable)
      return error('Preencha os campos!')

    setLoading(true)

    try {
      await changeDisplayName(displayName)
      success('Nome de usuário atualizado com sucesso!')
      setEmail("")
      setLoading(false)
    } catch (err) {
      error("Houve algum erro ao tentar atualizar o nome de usuário.")
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
          placeholder="Nome de usuário:"
          onFocus={() => moveFormUp(true)}
          value={displayName}
          onChangeText={setEmail}
        />
        <View style={{
          marginTop: 12,
        }}>
          <Button
            name="Atualizar username"
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

export default ChangeDisplayName
