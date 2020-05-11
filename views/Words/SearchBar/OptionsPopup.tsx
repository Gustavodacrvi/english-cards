

import React from 'react'

import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { backgroundColor, darkBackgroundColor, primary } from '../../../styles/colors'
import { IconInterface } from '../../../interfaces'
import Icon from '../../../components/Icon'

interface Props {
  setSort: (sort: 'alphabetical' | 'creation' | 'reviews') => void;
  sort: string;
  close: () => void;
}

function OptionsPopup({sort, setSort, close}: Props) {

  const getOption = (icon: IconInterface, name: string, key: 'alphabetical' | 'creation' | 'reviews') => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(primary, false)}
      useForeground={true}
      onPress={() => {
        close()
        setSort(key)
      }}
    >
      <View
        style={s.Option}
      >
        <Icon {...icon} width={22}/>
        <Text style={[
          s.Text,
          {
            color: (sort === key) ? primary : "#fff",
          },
        ]}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  )
  
  return (
    <View
      style={{
        backgroundColor,
        width: 280,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: darkBackgroundColor,
      }}
    >
      <View
        style={{
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: darkBackgroundColor,
          borderBottomWidth: 2,
        }}
      >
        <Text style={s.Text}>Ordenar por</Text>
      </View>

      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {getOption({icon: 'sort-by-name'}, 'Ordem alfabética', 'alphabetical')}
        {getOption({icon: 'saved'}, 'Dia de criação', 'creation')}
        {getOption({icon: 'notification'}, 'Número de Revisões', 'reviews')}
      </View>
      
    </View>
  )
}

const s = StyleSheet.create({
  Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginLeft: 8,
  },
  Option: {
    height: 38,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default OptionsPopup
