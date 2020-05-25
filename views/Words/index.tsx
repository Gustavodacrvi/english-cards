

import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, StatusBar } from 'react-native'

import TabWrapper from './Tab'
import ActionButton from './ActionButton'
import SelectedMenu from './SelectedMenu'
import SearchBar from './SearchBar'
import AddWord from './AddWord'
import { WordInterface } from '../../interfaces'

import mom from 'moment-timezone'
import { getWordName, getNextReviewDate, forgotWord, filterList, sortList } from '../../utils'
import Intercept from './Intercept'
import { PopupContext } from '../../contexts/popup'
import { backgroundColor } from '../../styles/colors'

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
        lastReview: '2020-05-16 05',
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
    showLoadingScreen: true,
  }

  constructor(props) {
    super(props)

    this.state.sorted = this.sortList(this.state.sort, this.state.currentTab, this.state.list, this.state.search)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showLoadingScreen: false,
      })
    })
  }

  sortList(sort: 'alphabetical' | 'creation' | 'reviews', currentTab: 'saved' | 'forgotten' | 'learned', list: WordInterface[], search: string, forceTabChange?: boolean) {

    return sortList(this.state.sort, sort,
      filterList(this.state.search, search, this.state.currentTab, currentTab, list, forceTabChange),
      forceTabChange)
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
          <StatusBar barStyle="light-content" backgroundColor={backgroundColor}/>

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
