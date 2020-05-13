
import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import { StyleSheet, Animated, GestureResponderEvent, View } from 'react-native'
import { primary } from '../../../../styles/colors'
import { PanGestureHandler, TouchableNativeFeedback, State } from 'react-native-gesture-handler'
import GestureBackground from './GestureBackground'
import WordContent from './WordContent'

interface Props {
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
  name: string;
  translation: string;
  id: string;
  willEnter: boolean;
  active: boolean;
}

const WordElement = forwardRef(({name, leftAction, onPress, rightAction, willEnter, translation, active, id}: Props, ref) => {

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
      speed: 28,
      useNativeDriver: true,
    }).start()
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
  
  const activeOffsetX = 40

  useImperativeHandle(ref, () => ({cancelGesture, runFlipAnimation, layout: layout.current, runEnterAnimation, runLeaveAnimation, id}))

  console.log('run', name)
  
  return (
    <Animated.View
      onResponderTerminationRequest={() => false}
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
        onPress={() => onPress(id)}
      >
        <View>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={onGestureEvent}
            minDist={10}
            shouldCancelWhenOutside={true}
            activeOffsetX={activeOffsetX}
            onHandlerStateChange={evt => {

              if (evt.nativeEvent.state === State.END || evt.nativeEvent.state === State.CANCELLED) {
                const x = evt.nativeEvent.translationX
                
                cancelGesture()
                
                setTimeout(() => {
                  if (Math.abs(x) > activeOffsetX) {
                    if (x > 0) {
                      leftAction(id)
                    } else if (x < 0) {
                      rightAction(id)
                    }
                  }
                })
                
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
                active={active}
                deleteValue={deleteValue.current}
                translation={translation}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
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
