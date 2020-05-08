/**
 * @format
 */


import {AppRegistry, StatusBar} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app'

firebase.initializeApp({
  appId: '1:864055444449:android:45fb8584bfc65c5228c8a0',
  projectId: 'english-cards-1c691',
})


import changeNavigationBarColor from 'react-native-navigation-bar-color'

StatusBar.setBarStyle( 'light-content',true)
StatusBar.setBackgroundColor("#525A79")
changeNavigationBarColor('#525A79', false, false)

AppRegistry.registerComponent(appName, () => App);
