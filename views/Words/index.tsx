

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Keyboard, GestureResponderEvent } from 'react-native'

import TabWrapper from './Tab'
import SearchBar from './SearchBar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import List from './List'

class WordsPage extends React.Component {
  state = {
    currentTab: 'saved' as 'saved' | 'forgotten' | 'learned',
    list: [
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
      {
        name: 'Chair',
        translation: 'Cadeira',
      },
      {
        name: 'Hand',
        translation: 'Mão',
      },
      {
        name: 'Sleep',
        translation: 'Dormir',
      },
    ],
    search: '',
    sort: 'creation' as 'alphabetical' | 'creation' | 'reviews',
    selected: [],
  }

  selectWord = name => {
    if (!this.state.selected.includes(name))
      this.setState({
        selected: [...this.state.selected, name],
      })
    else
    this.setState({
      selected: this.state.selected.filter(key => key !== name),
    })
  }

  onPress = (id: string) => {
    this.selectWord(id)
  }

  setTab = (tab: 'saved' | 'forgotten' | 'learned') => {
    this.setState({
      currentTab: tab,
    })
  }
  setSearch = (search: string) => {
    this.setState({
      search,
    })
  }
  setSort = (sort: 'alphabetical' | 'creation' | 'reviews') => {
    this.setState({
      sort,
    })
  }
  removeWord = (name) => {
    this.setState({
      list: this.state.list.filter(el => el.name !== name)
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            selected: [],
          })
          Keyboard.dismiss()
        }}
      >
        <View
          style={s.Page}
        >
  
          <TabWrapper
            tab={this.state.currentTab}
            setTab={this.setTab}
          />
          <SearchBar
            sort={this.state.sort}
            setSearch={this.setSearch}
            setSort={this.setSort}
          />
          <List
            id="name"
            selected={this.state.selected}
            leftAction={this.removeWord}
            rightAction={this.selectWord}
            onPress={this.onPress}
            list={this.state.list}
          />
          
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const s = StyleSheet.create({
  Page: {
    padding: 20,
    height: '100%',
  },
})

export default WordsPage
