

import React from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { darkBackgroundColor, backgroundColor, primary } from '../../../styles/colors'
import Icon from '../../../components/Icon'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { animateProperty } from '../../../animations'

function SelectedMenu({active}: {active: boolean}) {
  return (
    <View
      style={s.SelectedMenu}
    >
      <Animated.View
        style={[
          s.Wrapper,
          {
            opacity: animateProperty(active ? 1 : 0, true),
            transform: [
              {
                scale: animateProperty(active ? 1 : .9, true)
              },
              {
                translateY: animateProperty(active ? 0 : 5, true)
              },
            ],
          },
        ]}
      >

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={true}
        >
          <View
            style={s.Option}
          >
            <Icon
              icon='saved'
              width={22}
            />
            <Text
              style={s.Text}
            >Estudar selecionadas</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={true}
        >
          <View
            style={s.Option}
          >
            <Icon
              icon='trash'
              width={22}
            />
            <Text
              style={s.Text}
            >Apagar selecionadas</Text>
          </View>
        </TouchableNativeFeedback>

      </Animated.View>
    </View>
  )
}

const s = StyleSheet.create({
  SelectedMenu: {
    position: 'absolute',
    bottom: 73,
    height: 82,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  Wrapper: {
    width: 230,
    height: '100%',
    borderColor: darkBackgroundColor,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
  },
  Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    marginLeft: 15,
  },
})

export default React.memo(SelectedMenu)
