

import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import { backgroundColor } from '../../styles/colors'
import SearchBar from '../Words/SearchBar'
import { WordInterface } from '../../interfaces'
import { filterList, sortList } from '../../utils'
import Intercept from '../Words/Intercept'

class Archived extends React.Component {
  state = {
    sort: 'creation' as 'alphabetical' | 'creation' | 'reviews',
    search: '',
    list: [],
    sorted: [],

    showLoadingScreen: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showLoadingScreen: false,
      })
    })
  }

  setSearch = (search: string) => {
    this.setState({
      sorted: this.sortList(this.state.sort, this.state.list, search),
      search,
    })
  }
  setSort = (sort: 'alphabetical' | 'creation' | 'reviews') => {
    if (sort !== this.state.sort)
      this.setState({
        sorted: this.sortList(sort, this.state.list, this.state.search),
        sort,
      })
  }

  sortList(sort: 'alphabetical' | 'creation' | 'reviews', list: WordInterface[], search: string, forceProcedures?: boolean) {
    return sortList(
      this.state.sort,
      sort,
      filterList(this.state.search, search, null, null, list, forceProcedures),
      forceProcedures,
    )
  }


  render() {
    return (
      <View
        style={s.Archived}
      >
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor}/>
        
        <SearchBar
          sort={this.state.sort}
          setSearch={this.setSearch}
          setSort={this.setSort}
        />

        <Intercept
          showLoadingScreen={this.state.showLoadingScreen}
          tab='archive'
          height={45}
          
          list={this.state.sorted}

          showCreationDate={true}
          showNextReviewDate={false}
          showLastReviewDate={true}
        />
        
      </View>
    )
  }
}

const s = StyleSheet.create({
  Archived: {
    height: '100%',
    position: 'relative',
    padding: 20,
    paddingBottom: 0,
  },
})

export default Archived
