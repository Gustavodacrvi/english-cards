

import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'

import TabWrapper from './Tab'
import SearchBar from './SearchBar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import List from './List'

function WordsPage() {
  const [currentTab, setTab] = useState('saved' as 'saved' | 'forgotten' | 'learned')
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState('creation' as 'alphabetical' | 'creation' | 'reviews')
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View
        style={s.Page}
      >

        <TabWrapper
          tab={currentTab}
          setTab={setTab}
        />
        <SearchBar
          sort={sort}
          setSearch={setSearch}
          setSort={setSort}
        />
        <List
          list={[
            {
              name: 'Car',
              translation: 'Carro',
            },
            {
              name: 'Notification',
              translation: 'Notificação',
            },
            {
              name: 'Random',
              translation: 'Aleatório',
            },
            {
              name: 'Computer',
              translation: 'Computador',
            },
            {
              name: 'Arrows',
              translation: 'Flechas',
            },
          ]}
        />
        
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  Page: {
    padding: 20,
    height: '100%',
  },
})

export default WordsPage
