

import { enableScreens } from 'react-native-screens'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

enableScreens()

import Authentication from './../views/Authentication/'
import Slides from './../views/Slides/'
import Header from '../components/Header'
import ModalHeader from '../components/ModalHeader'
import ResetPassword from '../views/ResetPassword'


const Navigator = createStackNavigator({
    Slides: {
      screen: Slides,
      navigationOptions: {
        header: null,
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    Authentication: {
      screen: Authentication,
      navigationOptions: {
        header: null,
        ...TransitionPresets.SlideFromRightIOS
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: ModalHeader, 
        ...TransitionPresets.RevealFromBottomAndroid,
      },
    },  
  }, {
    initialRouteName: 'Authentication',
    headerMode: 'screen',
  })


export default createAppContainer(Navigator)
  