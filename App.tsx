

import React from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Icon from "./components/Icon"

export default class App extends React.Component {
  state = {
    color: 'yellow'
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        color: 'blue',
      })

      setTimeout(() => {
        this.setState({
          color: 'green',
        })

        setTimeout(() => {
          this.setState({
            color: 'purple',
          })
        }, 2500)
        
      }, 2500)
      
    }, 2500)
    
  }
  
  render() {
    console.log(this.state.color)
    return (
      <View style={{backgroundColor: '#525A79', height: '100%'}}>
        <Text style={globalStyles.Text}>Step 3</Text>
        <Icon
          width={200}
          primaryColor={this.state.color}
        />
      </View>
    )
  }
}
