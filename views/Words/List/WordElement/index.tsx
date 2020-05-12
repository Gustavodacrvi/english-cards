
import React, { useState, useRef } from 'react'

import { View, Text, StyleSheet, Animated, Vibration } from 'react-native'
import { faded, primary, backgroundColor, red } from '../../../../styles/colors'
import { TouchableNativeFeedback, PanGestureHandler, State } from 'react-native-gesture-handler'
import GestureBackground from './GestureBackground'
import WordContent from './WordContent'

function WordElement({name, translation}: {name: string; translation: string}) {
  
  const touchX = new Animated.Value(0)
  const deleteValue = new Animated.Value(0)
  
  const onGestureEvent = Animated.event([{nativeEvent: {translationX: touchX}}], { useNativeDriver: true })

  const cancelGesture = () => {
    Animated.spring(touchX, {
      toValue: 0,
      bounciness: 12,
      speed: 16,
      useNativeDriver: true,
    }).start()
  }
  const deleteElement = () => {
/*     Animated.spring(touchX, {
      toValue: 0,
      bounciness: 0,
      speed: 50,
      useNativeDriver: true,
    }).start()
    Animated.spring(deleteValue, {
      toValue: 1,
      bounciness: 0,
      speed: 50,
      useNativeDriver: false,
    }).start() */
  }

  const activeOffsetX = 75
  
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
          minDist={10}
          activeOffsetX={activeOffsetX}
          onHandlerStateChange={evt => {

            if (evt.nativeEvent.state === State.END) {

              
              if (evt.nativeEvent.translationX < activeOffsetX) {
                console.log('cancel')
                cancelGesture()
              } else if (evt.nativeEvent.translationX > 0) {
                console.log('delete')
                deleteElement()
              }
              
            }
          }}
        >
          <Animated.View
            style={[
              s.GestureWrapper,
              {
                height: deleteValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [43, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <GestureBackground
              touchX={touchX}
              activeOffsetX={activeOffsetX}
            />
            <WordContent
              touchX={touchX}
              name={name}
              deleteValue={deleteValue}
              translation={translation}
            />
          </Animated.View>
        </PanGestureHandler>
      </TouchableNativeFeedback>
    </View>
  )
}

const s = StyleSheet.create({
  GestureWrapper: {
    position: 'relative',
  },
  WordElement: {
    borderRadius: 8,
    overflow: 'hidden',
    // maxHeight: 43,
  },
})

export default React.memo(WordElement)
