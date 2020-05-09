

import React from 'react'
import { backgroundColor } from './styles/colors'

import Toast from "./components/Toast/"
import ToastContextProvider from './contexts/toast'
import AuthContextProvider from './contexts/auth'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Authentication from './views/Authentication'
import Slides from './views/Slides'
import ResetPassword from './views/ResetPassword'
import ModalHeader from './components/ModalHeader'
import InfoView from './views/InfoView'
import { View } from 'react-native'

const Stack = createStackNavigator()

const fullScreenModal: any = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  header: ModalHeader,
}

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>

        <NavigationContainer>
          <Stack.Navigator
            headerMode='screen'
            screenOptions={{
              headerStyle: {
                backgroundColor,
              },
            }}
          >

            <Stack.Screen
              name='Slides'
              component={Slides}
              options={{
                header: () => <View></View>,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name='Authentication'
              component={Authentication}
              options={{
                header: () => <View></View>,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
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

          </Stack.Navigator>
        </NavigationContainer>

        <Toast/>

      </AuthContextProvider>
    </ToastContextProvider>
  )
}

export default App
