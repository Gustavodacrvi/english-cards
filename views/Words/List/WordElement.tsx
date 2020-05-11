
import React, { useState } from 'react'

import { View, Text, StyleSheet, Animated } from 'react-native'
import { faded, primary } from '../../../styles/colors'
import { TouchableNativeFeedback, PanGestureHandler, State } from 'react-native-gesture-handler'

function WordElement({name, translation}: {name: string; translation: string}) {
  
  const [translateX, setTranslation] = useState(0)

  const touchX = new Animated.Value(0)
  
  const onGestureEvent = Animated.event([{nativeEvent: {translationX: touchX}}], { useNativeDriver: true })

  return (
    <View
      style={s.WordElement}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(primary, false)}
        useForeground={true}
      >
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={evt => {
            if (evt.nativeEvent.state === State.END) {
              Animated.spring(touchX, {
                toValue: 0,
                bounciness: 12,
                speed: 16,
                useNativeDriver: true,
              }).start()
            }
          }}
        >
          <Animated.View
            style={[
              s.Wrapper,
              {
                transform: [{translateX: touchX}],
              }
            ]}
          >
            <View
              style={s.Content}
            >
              <View>
                <Text style={s.BigText}>{name}</Text>
              </View>
              <View>
                <Text style={s.Info}>{translation}</Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </TouchableNativeFeedback>
    </View>
  )
}

const s = StyleSheet.create({
  WordElement: {
    borderRadius: 8,
  },
  Wrapper: {
    height: 43,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingBottom: 2,
  },
  Content: {
    height: 25,
    display: 'flex',
    justifyContent: 'space-around',
  },
  BigText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 17,
  },
  Info: {
    fontSize: 11,
    marginTop: 4,
    color: faded,
    fontFamily: 'OpenSans-Semibold',
  },
})

export default React.memo(WordElement)
