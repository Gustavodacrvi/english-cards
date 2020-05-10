

import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TabWrapper from './Tab'

function WordsPage() {
  const [currentTab, setTab] = useState('Saved')
  
  return (
    <View
      style={s.Page}
    >
      <TabWrapper
        tab={currentTab}
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
