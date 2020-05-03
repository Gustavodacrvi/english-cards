

import React from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Icon from "./components/Icon"

export default class App extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#525A79', height: '100%'}}>
        <Text style={globalStyles.Text}>Step 3</Text>

        <Icon icon="home"/>
        <Icon icon="alert"/>
        <Icon icon='book'/>
        <Icon icon='words'/>
        <Icon icon='cards'/>
        <Icon icon='loading'/>
        <Icon icon='notification-trash'/>
        <Icon icon='notification'/>
        <Icon icon='plus'/>
        <Icon icon='saved'/>
        <Icon icon='search'/>
        <Icon icon='sort-by-name'/>
        <Icon icon='sort'/>
        <Icon icon='trash'/>
        <Icon icon='user'/>
        <Icon icon='wifi'/>

      </View>
    )
  }
}
