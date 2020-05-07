

import React from 'react'

import { View, StyleSheet, Text, Animated } from 'react-native'
import { backgroundColor } from '../../styles/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { animateProperty } from '../../animations'

function AuthHeader({
  isLogin,
  setLogin,
}: {
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void,
}) {
  return (
   <View
    style={s.Wrapper}
   >
      <Animated.View style={[s.Background,
        {
          transform: [
            {
              translateX: animateProperty(!isLogin ? 130 : 0, 200),
            },
          ],
        },
      ]}></Animated.View>
     <View style={s.ActualContent}>
      <TouchableNativeFeedback
        useForeground={true}
        style={s.Touchable}

        onPress={() => setLogin(true)}
      >
        <View style={s.View}>
          <Animated.Text
            style={[s.Text,
              {
                color: animateProperty(isLogin ? '#fff' : backgroundColor)
              },
            ]}
          >
            Entrar
          </Animated.Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        useForeground={true}
        style={s.Touchable}

        onPress={() => setLogin(false)}
      >
        <View style={s.View}>
          <Animated.Text style={[s.Text,
            {
              color: animateProperty(!isLogin ? '#fff' : backgroundColor)
            },
          ]}>
            Criar conta
          </Animated.Text>
        </View>
      </TouchableNativeFeedback>
     </View>
   </View> 
  )
}

const s = StyleSheet.create({
  Wrapper: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 3,
    height: 48,
    backgroundColor: 'white',
    position: 'relative',
  },
  Background: {
    position: 'absolute',
    backgroundColor: backgroundColor,
    height: 42,
    borderRadius: 8,
    width: '50%',
    zIndex: 1,
  },
  ActualContent: {
    position: 'relative',
    height: 42,
    width: '100%',
    borderRadius: 8,
    zIndex: 5,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontFamily: 'OpenSans-Bold',
    color: backgroundColor,
    fontSize: 16,
  },
  Touchable: {
    width: 130,
    borderRadius: 8,
  },
  View: {
    width: '100%',
    height: "100%",
    display: 'flex',
    borderRadius: 8,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default React.memo(AuthHeader)
