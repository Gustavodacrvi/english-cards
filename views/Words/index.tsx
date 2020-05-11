

import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'

import TabWrapper from './Tab'
import SearchBar from './SearchBar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

function WordsPage() {
  const [currentTab, setTab] = useState('forgotten' as 'saved' | 'forgotten' | 'learned')
  
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
        <SearchBar/>
        
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  Page: {
    padding: 28,
    height: '100%',
  },
})

export default WordsPage
