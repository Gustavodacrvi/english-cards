

import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

import TabWrapper from './Tab'
import ActionButton from './ActionButton'
import SelectedMenu from './SelectedMenu'
import SearchBar from './SearchBar'
import List from './List'
import { WordInterface } from '../../interfaces'

const emptyList = []

class WordsPage extends React.Component {
  state = {
    currentTab: 'saved' as 'saved' | 'forgotten' | 'learned',
    list: [
      {
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Notification',
          translation: 'Notificação',
        },
      },
      {
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Car',
          translation: 'Carro',
        },
      },
      {
        lastReview: '2020-05-16',
        reviewNumber: 7,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Random',
          translation: 'Aleatório',
        },
      },
      {
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Computer',
          translation: 'Computador',
        },
      },
      {
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Chair',
          translation: 'Cadeira',
        },
      },
      {
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16',
        api: 'simple',
        data: {
          term: 'Hand',
          translation: 'Mão',
        },
      },
    ] as WordInterface[],
    search: '',
    sort: 'creation' as 'alphabetical' | 'creation' | 'reviews',
    selected: [],
    sorted: [],
  }

  constructor(props) {
    super(props)

    this.state.sorted = this.sortList(this.state.sort, this.state.currentTab, this.state.list, this.state.search)
  }

  componentDidUpdate() {
    if (this.state.selected !== this.state.selected)
      this.setState({
        selected: emptyList,
      })
  }

  sortList(sort: 'alphabetical' | 'creation' | 'reviews', currentTab: 'saved' | 'forgotten' | 'learned', arr: any[], search: string) {
    return arr.slice()
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
        sorted: this.sortList(this.state.sort, tab, this.state.list, this.state.search),
        currentTab: tab,
      })
  }
  setSearch = (search: string) => {
    this.setState({
      sorted: this.sortList(this.state.sort, this.state.currentTab, this.state.list, search),
      search,
    })
  }
  setSort = (sort: 'alphabetical' | 'creation' | 'reviews') => {
    if (sort !== this.state.sort)
      this.setState({
        sorted: this.sortList(this.state.sort, this.state.currentTab, this.state.list, this.state.search),
        sort,
      })
  }
  removeWord = (name) => {
/*     this.setState({
      list: this.state.list.filter(el => el.name !== name)
    }) */
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
              list={this.state.sorted}

              showCreationDate={this.state.currentTab === 'saved'}
              showNextReviewDate={this.state.currentTab !== 'saved'}
              showLastReviewDate={this.state.currentTab === 'learned'}
            />
            <ActionButton
              active={this.state.currentTab === 'saved' && this.state.selected.length === 0}
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
