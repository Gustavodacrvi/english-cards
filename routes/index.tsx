

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { enableScreens } from 'react-native-screens'

enableScreens();

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
