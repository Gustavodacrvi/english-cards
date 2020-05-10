

import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TabWrapper from './Tab'

function WordsPage() {
  const [currentTab, setTab] = useState('forgotten' as 'saved' | 'forgotten' | 'learned')
  
  return (
    <View
      style={s.Page}
    >
      <TabWrapper
        tab={currentTab}
        setTab={setTab}
      />
    </View>
  )
}

const s = StyleSheet.create({
  Page: {
    padding: 28,
  },
})

export default WordsPage
