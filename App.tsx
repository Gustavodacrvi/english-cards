

import React, { useState } from 'react'
import { backgroundColor } from './styles/colors'

import Toast from "./components/Toast/"
import Popup from "./components/Popup/"
import ToastContextProvider from './contexts/toast'
import AuthContextProvider from './contexts/auth'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Authentication from './views/Authentication'
import Slides from './views/Slides'
import ResetPassword from './views/ResetPassword'
import ModalHeader from './components/ModalHeader'
import InfoView from './views/InfoView'
import { View, StatusBar, AsyncStorage } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import SplashScreen from './views/SplashScreen'
import WordsPage from './views/Words'
import Header from './components/Header/'
import PopupContextProvider from './contexts/popup'

const Stack = createStackNavigator()

const fullScreenModal: any = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  header: ModalHeader,
}

function App() {
  const [isGettingLoggedToken, setIsGettingLoggedToken] = useState(true)
  const [isGettingSlidesToken, setIsGettingSlidesToken] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [shouldSeeSlides, renderSlides] = useState(false)

  AsyncStorage.getItem('FlashTranslator.sawSlides').then(res => {
    if (res === null)
      renderSlides(true)
    setIsGettingSlidesToken(false)
  })
  AsyncStorage.getItem('FlashTranslator.isLoggedIn').then(res => {
    if (res !== null && res !== 'false')
      setIsLoggedIn(true)
    setIsGettingLoggedToken(false)
  })

  StatusBar.setBarStyle( 'light-content',true)
  StatusBar.setBackgroundColor("#525A79")
  changeNavigationBarColor('#525A79', false, false)

  const Splash = <Stack.Screen
      name='SplashScreen'
      component={SplashScreen}
      options={{
        header: () => <View></View>,
        ...TransitionPresets.DefaultTransition,
      }}
    />

  const SlidesComp = <Stack.Screen
      name='Slides'
      component={Slides}
      options={{
        header: () => <View></View>,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />

  const Auth = <Stack.Screen
      name='Authentication'
      component={Authentication}
      options={{
        header: () => <View></View>,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
  
  const Screens = (
    <>
      <Stack.Screen
        name='ResetPassword'
        component={ResetPassword}
        options={fullScreenModal}
      />

      <Stack.Screen
        name='Terms'
        component={InfoView({
          hero: 'Termos de uso',
          normal:
          `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        })}
        options={fullScreenModal}
      />
      <Stack.Screen
        name='Privacy'
        component={InfoView({
          hero: 'Política de Privacidade',
          normal:
          `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        })}
        options={fullScreenModal}
      />
    </>
  )

  const userScreens = (
    <>
      <Stack.Screen
        name='Words'
        component={WordsPage}
        options={{
          header: Header,
          ...TransitionPresets.DefaultTransition,
        }}
      />
    </>
  )
  
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <PopupContextProvider>

        <NavigationContainer>
          <Stack.Navigator
            headerMode='screen'
            screenOptions={{
              headerStyle: {
                backgroundColor,
              },
              cardStyle: {
                backgroundColor,
              },
            }}
          >

            {(() => {
              if (isGettingLoggedToken || isGettingSlidesToken)
                return Splash
              
              if (shouldSeeSlides)
                return [
                  SlidesComp,
                  Auth,
                  Screens,
                ]

              if (isLoggedIn)
                return [
                  userScreens,
                  Auth,
                  Screens,
                ]

              return [
                Auth,
                userScreens,
                Screens,
              ]
            })()}

          </Stack.Navigator>
        </NavigationContainer>

        <Toast/>
        <Popup/>

        </PopupContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  )
}

export default App
