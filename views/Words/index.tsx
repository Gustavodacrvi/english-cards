

import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

import TabWrapper from './Tab'
import ActionButton from './ActionButton'
import SelectedMenu from './SelectedMenu'
import SearchBar from './SearchBar'
import AddWord from './AddWord'
import { WordInterface } from '../../interfaces'

import mom from 'moment-timezone'
import { getWordName, getNextReviewDate, forgotWord } from '../../utils'
import Intercept from './Intercept'
import { PopupContext } from '../../contexts/popup'

class WordsPage extends React.Component {
  state = {
    currentTab: 'saved' as 'saved' | 'forgotten' | 'learned',
    list: [
      {
        uid: 'a',
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16 05',
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
        creationDate: '2020-05-15 05',
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
        creationDate: '2020-05-16 05',
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
        creationDate: '2020-05-16 05',
        api: 'simple',
        data: {
          term: 'Computer',
          translation: 'Computador',
        },
      },
      {
        uid: 'k',
        lastReview: null,
        reviewNumber: null,
        creationDate: '2020-05-16 05',
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
    showLoadingScreen: false,
  }

  constructor(props) {
    super(props)

    this.state.sorted = this.sortList(this.state.sort, this.state.currentTab, this.state.list, this.state.search)
  }

  sortList(sort: 'alphabetical' | 'creation' | 'reviews', currentTab: 'saved' | 'forgotten' | 'learned', list: WordInterface[], search: string, forceTabChange?: boolean) {

    let arr = list.slice()

    if (forceTabChange || search !== this.state.search)
      arr = !search ? list : list.filter(w => getWordName(w).toLowerCase().includes(search))

    if (forceTabChange || currentTab !== this.state.currentTab)
      switch (currentTab) {
        case 'saved': {
          arr = arr.filter(w => !w.lastReview)
          break
        }
        case 'learned': {
          arr = arr.filter(w => w.lastReview && !forgotWord(w))
          break
        }
        case 'forgotten': {
          arr = arr.filter(w => w.lastReview && forgotWord(w))
          break
        }
      }

    if (forceTabChange || sort !== this.state.sort)
      switch (sort) {
        case 'alphabetical': {
          arr.sort((a, b) => getWordName(a).toLowerCase().localeCompare(getWordName(b).toLowerCase()))
          break
        }
        case 'creation': {
          arr.sort((word1, word2) => {
            const a = mom(word1.creationDate, 'Y-M-D mm')
            const b = mom(word2.creationDate, 'Y-M-D mm')
    
            if (a.isSame(b, 'day')) return 0
            if (a.isAfter(b, 'day')) return -1
            if (b.isAfter(a, 'day')) return 1
          })
          break
        }
        default: {
          arr.sort((word1, word2) => {
            const a = mom(getNextReviewDate(word1), 'Y-M-D mm')
            const b = mom(getNextReviewDate(word2), 'Y-M-D mm')
    
            if (a.isSame(b, 'day')) return 0
            if (a.isAfter(b, 'day')) return -1
            if (b.isAfter(a, 'day')) return 1
          })
          break
        }
      }

    return arr
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
    if (tab !== this.state.currentTab) {
      this.setState({
        currentTab: tab,
        showLoadingScreen: true,
      })
      setTimeout(() => {
        this.setState({
          showLoadingScreen: false,
          sorted: this.sortList(this.state.sort, this.state.currentTab, this.state.list, this.state.search, true),
        })
      })
    }
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
  actionButtonClick = () => {
    this.context.pushPopup(() => <AddWord/>)
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
            <View
              style={s.Tab}
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
            </View>

            <Intercept
              showLoadingScreen={this.state.showLoadingScreen}
              tab={this.state.currentTab}
              height={45}
              
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
              onClick={this.actionButtonClick}
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
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  Tab: {
    padding: 20,
    paddingBottom: 0,
  },
})

WordsPage.contextType = PopupContext

export default WordsPage
