

import React from 'react'
import { animateProperty } from '../../animations'
import List from './List'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { backgroundColor, darkBackgroundColor } from '../../styles/colors'
import Icon from '../../components/Icon'

import {ListRenderingProps} from './List/'
import InterceptEmptyList from './InterceptEmptyList'

function Intercept(props: ListRenderingProps & {showLoadingScreen: boolean, tab: string}) {

  return (
    <View
      style={s.ContentWrapper}
    >

      {!props.showLoadingScreen && <List {...props}/>}
      <Animated.View
        style={[
          s.ListLoading,
          {
            opacity: animateProperty(props.showLoadingScreen ? 1 : 0, true)
          }
        ]}
        pointerEvents="none"
      >
        <Icon
          icon='loading'
          width={75}
          rotate={true}
        />
      </Animated.View>
      <InterceptEmptyList
        tab={props.tab}
        show={!props.list.length}
      />
      
    </View>
  )
}

const s = StyleSheet.create({
  ContentWrapper: {
    flex: 1,
    paddingBottom: 73,
  },
  ListLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor,
  },
})

export default Intercept
