/**
 * @format
 */


import {AppRegistry, StatusBar} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';

import changeNavigationBarColor from 'react-native-navigation-bar-color'

StatusBar.setBarStyle( 'light-content',true)
StatusBar.setBackgroundColor("#525A79")
changeNavigationBarColor('#525A79', false, false)

AppRegistry.registerComponent(appName, () => App);
