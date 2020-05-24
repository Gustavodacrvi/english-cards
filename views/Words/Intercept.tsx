

import React from 'react'
import List from './List'
import { View, StyleSheet } from 'react-native'

import {ListRenderingProps} from './List/'
import InterceptEmptyList from './InterceptEmptyList'
import LoadingComp from './LoadingComp'

function Intercept(props: ListRenderingProps & {showLoadingScreen: boolean, tab: string}) {

  return (
    <View
      style={s.ContentWrapper}
    >

      <InterceptEmptyList
        tab={props.tab}
        show={!props.list.length && !props.showLoadingScreen}
      />
      {!props.showLoadingScreen && <List {...props}/>}
      <LoadingComp
        show={props.showLoadingScreen}
      />
      
    </View>
  )
}

const s = StyleSheet.create({
  ContentWrapper: {
    flex: 1,
    paddingBottom: 73,
  },
})

export default Intercept
