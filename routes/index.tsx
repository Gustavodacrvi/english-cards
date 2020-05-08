

import { enableScreens } from 'react-native-screens'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

enableScreens()

import Authentication from './../views/Authentication/'
import Slides from './../views/Slides/'
import Header from '../components/Header'
import ModalHeader from '../components/ModalHeader'
import ResetPassword from '../views/ResetPassword'
import InfoView from '../views/InfoView'

const fullScreenModal: any = {
  header: ModalHeader, 
  ...TransitionPresets.RevealFromBottomAndroid,
}

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
      navigationOptions: fullScreenModal,
    },
    Terms: {
      screen: InfoView({
        hero: 'Termos de uso',
        normal:
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      }),
      navigationOptions: fullScreenModal,
    },
    Privacy: {
      screen: InfoView({
        hero: 'Política de privacidade',
        normal: 
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,

      }),
      navigationOptions: fullScreenModal,
    },
  }, {
    initialRouteName: 'Authentication',
    headerMode: 'screen',
  })


export default createAppContainer(Navigator)
  