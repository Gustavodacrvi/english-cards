

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'

import TabWrapper from './Tab'
import SearchBar from './SearchBar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import List from './List'

function WordsPage() {
  const [currentTab, setTab] = useState('saved' as 'saved' | 'forgotten' | 'learned')
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState('creation' as 'alphabetical' | 'creation' | 'reviews')

  // A B C D E F

  const initial = [
    {
      name: 'A',
      translation: 'a',
    },
    {
      name: 'B',
      translation: 'b',
    },
    {
      name: 'C',
      translation: 'c',
    },
    {
      name: 'D',
      translation: 'd',
    },
    {
      name: 'E',
      translation: 'e',
    },
    {
      name: 'F',
      translation: 'f',
    },
  ]
  
  const [list, setList] = useState(initial)

  const change = () => {

    setTimeout(() => {

      // D J F K A B

      setList([
        {
          name: 'D',
          translation: 'd',
        },
        {
          name: 'J',
          translation: 'j',
        },
        {
          name: 'F',
          translation: 'f',
        },
        {
          name: 'K',
          translation: 'k',
        },
        {
          name: 'A',
          translation: 'a',
        },
        {
          name: 'B',
          translation: 'b',
        },
      ])

      setTimeout(() => {

        setList(initial)

        change()
        
      }, 10000)
      
    }, 10000)

  }

  useEffect(() => {
    change()
  }, [])
  
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
          id="name"
          list={list}
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
