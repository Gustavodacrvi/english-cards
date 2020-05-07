

import { createStackNavigator } from 'react-navigation-stack'
import { FluidNavigator } from 'react-navigation-fluid-transitions'
import { createAppContainer } from 'react-navigation'

import Authentication from './../views/Authentication/'
import Slides from './../views/Slides/'

export default createAppContainer(
  createStackNavigator({
    Slides: {
      screen: Slides,
    },
    Authentication: {
      screen: Authentication,
    },
  }, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  })
)
