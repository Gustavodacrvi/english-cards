
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'

import { View, Text, StyleSheet, Animated, Vibration } from 'react-native'
import { faded, primary, backgroundColor, red } from '../../../../styles/colors'
import { TouchableNativeFeedback, PanGestureHandler, State } from 'react-native-gesture-handler'
import GestureBackground from './GestureBackground'
import WordContent from './WordContent'

const WordElement = forwardRef(({name, willEnter, translation, id}: {name: string; translation: string, id: string, willEnter: boolean}, ref) => {

  const touchX = useRef(new Animated.Value(0))
  const flipX = useRef(new Animated.Value(0))
  const flipY = useRef(new Animated.Value(0))
  const deleteValue = useRef(new Animated.Value(willEnter ? 1 : 0))
  const layout = useRef(null)
  
  const onGestureEvent = Animated.event([{nativeEvent: {translationX: touchX.current}}], { useNativeDriver: true })

  const cancelGesture = () => {
    Animated.spring(touchX.current, {
      toValue: 0,
      bounciness: 12,
      speed: 16,
      useNativeDriver: true,
    }).start()
  }
  const select = () => {
    cancelGesture()
  }

  const runLeaveAnimation = () => {
    return new Promise((solve) => {
      Animated.spring(touchX.current, {
        toValue: 0,
        bounciness: 0,
        speed: 50,
        useNativeDriver: true,
      }).start()
      Animated.spring(deleteValue.current, {
        toValue: 1,
        bounciness: 12,
        speed: 6,
        useNativeDriver: false,
      }).start(solve)
    })
  }
  const runEnterAnimation = () => {
    return new Promise(solve => {
      Animated.spring(deleteValue.current, {
        toValue: 0,
        bounciness: 12,
        speed: 6,
        useNativeDriver: false,
      }).start(solve)
    })
  }
  const runFlipAnimation = ({x, y}) => {
    return new Promise(solve => {
      flipX.current.setValue(x)
      flipY.current.setValue(y)

      Animated.spring(flipX.current, {
        toValue: 0,
        bounciness: 12,
        speed: 6,
        useNativeDriver: true,
      }).start()
      Animated.spring(flipY.current, {
        toValue: 0,
        bounciness: 12,
        speed: 6,
        useNativeDriver: true,
      }).start(solve)
    })
  }
  
  const activeOffsetX = 75

  useImperativeHandle(ref, () => ({cancelGesture, runFlipAnimation, layout: layout.current, runEnterAnimation, runLeaveAnimation, select, id}))
  
  return (
    <Animated.View
      style={[
        s.WordElement,
        {
          transform: [
            {
              translateX: flipX.current,
            },
            {
              translateY: flipY.current,
            },
          ],
        },
      ]}
      onLayout={evt => layout.current = evt.nativeEvent.layout}
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
              const x = evt.nativeEvent.translationX
              
              cancelGesture()

/*               if (Math.abs(x) < activeOffsetX) {
                cancelGesture()
              } else if (x > 0) {
                runLeaveAnimation()
              } else if (x < 0) {
                select()
              } */
              
            }
          }}
        >
          <Animated.View
            style={[
              s.GestureWrapper,
              {
                height: deleteValue.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [43, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <GestureBackground
              touchX={touchX.current}
              activeOffsetX={activeOffsetX}
            />
            <WordContent
              touchX={touchX.current}
              name={name}
              deleteValue={deleteValue.current}
              translation={translation}
            />
          </Animated.View>
        </PanGestureHandler>
      </TouchableNativeFeedback>
    </Animated.View>
  )
})

const s = StyleSheet.create({
  GestureWrapper: {
    position: 'relative',
  },
  WordElement: {
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default React.memo(WordElement)
