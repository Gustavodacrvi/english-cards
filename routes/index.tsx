

import { enableScreens } from 'react-native-screens'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

enableScreens()

import Authentication from './../views/Authentication/'
import Slides from './../views/Slides/'
import Header from '../components/Header'

const Navigator = createStackNavigator({
    Slides: {
      screen: Slides,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    Authentication: {
      screen: Authentication,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS
      },
    },
  }, {
    initialRouteName: 'Authentication',
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    }
  })


export default createAppContainer(Navigator)
  