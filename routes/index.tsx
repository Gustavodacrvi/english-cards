

import { enableScreens } from 'react-native-screens'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

enableScreens()

import Authentication from './../views/Authentication/'
import Slides from './../views/Slides/'

const Navigator = createStackNavigator({
    Slides: {
      screen: Slides,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    Authentication: {
      screen: Authentication,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
  }, {
    headerMode: 'none',
  })


export default createAppContainer(Navigator)
  