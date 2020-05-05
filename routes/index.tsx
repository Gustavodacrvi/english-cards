

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Authentication from './../views/Authentication/'


export default createAppContainer(
  createStackNavigator({
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
