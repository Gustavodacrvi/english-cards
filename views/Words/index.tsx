

import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

import TabWrapper from './Tab'
import ActionButton from './ActionButton'
import SelectedMenu from './SelectedMenu'
import SearchBar from './SearchBar'
import List from './List'
import { WordInterface } from '../../interfaces'

import mom from 'moment-timezone'

const emptyList = []

class WordsPage extends React.Component {
  state = {
    currentTab: 'saved' as 'saved' | 'forgotten' | 'learned',
    list: [
      {
        uid: 'a',
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
        uid: 'b',
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-15',
        api: 'simple',
        data: {
          term: 'Car',
          translation: 'Carro',
        },
      },
      {
        uid: 'c',
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
        uid: 'd',
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
        uid: 'e',
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
        uid: 'f',
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
    num: 0,
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

/*   componentDidMount() {
    setInterval(() => {
      this.setState({
        num: this.state.num + 1
      })
    }, 1000)
  } */

  sortList(sort: 'alphabetical' | 'creation' | 'reviews', currentTab: 'saved' | 'forgotten' | 'learned', list: WordInterface[], search: string) {

/*     let arr = !search ? list.slice() : list.filter(w => getWordName(w).toLowerCase().includes(search))

    if (sort === 'alphabetical')
      arr.sort((a, b) => getWordName(a).toLowerCase().localeCompare(getWordName(b).toLowerCase()))
    else if (sort === 'creation') {
      arr.sort((word1, word2) => {
        const a = mom(word1.creationDate, 'Y-M-D')
        const b = mom(word2.creationDate, 'Y-M-D')

        if (a.isSame(b, 'day')) return 0
        if (a.isAfter(b, 'day')) return -1
        if (b.isAfter(a, 'day')) return 1
      })
    } else {
      arr.sort((word1, word2) => {
        const a = mom(getNextReviewDate(word1), 'Y-M-D')
        const b = mom(getNextReviewDate(word2), 'Y-M-D')

        if (a.isSame(b, 'day')) return 0
        if (a.isAfter(b, 'day')) return -1
        if (b.isAfter(a, 'day')) return 1
      })
    } */
    
    return list.slice()
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
        sorted: this.sortList(sort, this.state.currentTab, this.state.list, this.state.search),
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
{/*           <View>
            <Test num={this.state.num}/>
            <Test num={this.state.num}/>
          </View> */}
    
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
              id="uid"
              direction="vertical"
              width={45}
              activateAnimations={false}
              
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
