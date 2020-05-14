

import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

import TabWrapper from './Tab'
import ActionButton from './ActionButton'
import SelectedMenu from './SelectedMenu'
import SearchBar from './SearchBar'
import List from './List'

class WordsPage extends React.Component {
  state = {
    currentTab: 'saved' as 'saved' | 'forgotten' | 'learned',
    list: [
      {
        name: 'Notification',
        translation: 'Notificação',
      },
      {
        name: 'Car',
        translation: 'Carro',
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
        name: 'Chair',
        translation: 'Cadeira',
      },
      {
        name: 'Hand',
        translation: 'Mão',
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
    if (tab !== this.state.currentTab)
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
    if (sort !== this.state.sort)
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
        onPress={evt => {
          if (this.state.selected.length)
            this.setState({
              selected: [],
            })
          Keyboard.dismiss()
        }}
      >
        <View>
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
              direction="vertical"
              width={45}
              
              selected={this.state.selected}
              leftAction={this.removeWord}
              rightAction={this.selectWord}
              onPress={this.onPress}
              list={this.state.list}
            />
            <ActionButton
              active={this.state.currentTab === 'saved'}
            />
            
          </View>
          <SelectedMenu
            active={this.state.selected.length > 0}
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
    position: 'relative',
  },
})

export default WordsPage
