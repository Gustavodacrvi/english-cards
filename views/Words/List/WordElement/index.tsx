
import React, { useRef, forwardRef, useImperativeHandle, MutableRefObject } from 'react'

import { StyleSheet, Animated, TouchableNativeFeedback, View, Easing } from 'react-native'
import { primary } from '../../../../styles/colors'
import { PanGestureHandler, State, Directions } from 'react-native-gesture-handler'
import GestureBackground from './GestureBackground'
import WordContent from './WordContent'
import { WordInterface } from '../../../../interfaces'

interface Props {
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
  id: string;
  willEnter: boolean;
  width: number;
  active: boolean;
  cleanUp: () => void;
  showNextReviewDate: boolean;
  showLastReviewDate: boolean;
  isMagicSelecting: {current: boolean};
  showCreationDate: boolean;
  affectMultiple: {current: ({target, key, translationX, isPositive}: {isPositive: boolean, target: number, key: string, translationX: number}) => void};
  transformProperty: 'translateX' | 'translateY';
}

const WordElement = forwardRef(({
  cleanUp,
  affectMultiple,
  width,
  transformProperty,
  leftAction,
  onPress,
  rightAction,
  lastReview,
  showLastReviewDate,
  showNextReviewDate,
  reviewNumber,
  creationDate,
  showCreationDate,
  api,
  data,
  willEnter,
  active,
  id,
}: Props & WordInterface, ref) => {

  const touchX = useRef(new Animated.Value(0))
  const flipValue = useRef(new Animated.Value(0))
  const deleteValue = useRef(new Animated.Value(willEnter ? 1 : 0))
  const activated = useRef(false)

  const activeOffsetX = 58
  
  const cancelGesture = () => {
    Animated.spring(touchX.current, {
      toValue: 0,
      bounciness: 12,
      speed: 24,
      useNativeDriver: true,
    }).start()
  }
  const activate = x => {
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

  const runLeaveAnimation = () => {
    return new Promise((solve) => {
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
        speed: 6,
        useNativeDriver: false,
      }).start(solve)
    })
  }
  const runFlipAnimation = (translate) => {
    return new Promise(solve => {

      flipValue.current.setValue(translate)

      requestAnimationFrame(() => {
        Animated.spring(flipValue.current, {
          toValue: 0,
          bounciness: 12,
          speed: 6,
          useNativeDriver: true,
        }).start(solve)
      })
    })
  }
  const pull = (toValue: number) => {
    Animated.timing(touchX.current, {
      toValue,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => activate(toValue))
  }

  useImperativeHandle(ref, () => ({cancelGesture, activate, pull, runFlipAnimation, runEnterAnimation, runLeaveAnimation, id}))

  const onGestureEvent = Animated.event([{nativeEvent: {translationX: touchX.current}}], { useNativeDriver: true })

  return (
    <Animated.View
      style={[
        s.WordElement,
        {
          transform: [
            {
              [transformProperty]: flipValue.current,
            },
          ],
        },
      ]}
    >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={true}
          onPress={evt => {
            evt.stopPropagation()
            onPress(id)
          }}
        >
          <View>
            <PanGestureHandler
              maxPointers={1}
              onGestureEvent={evt => {
                const y = evt.nativeEvent.y

                if (y > 0 && y <= width && !activated.current)
                  touchX.current.setValue(evt.nativeEvent.translationX)
                else if (!activated.current) {
                  activated.current = true
                  activate(evt.nativeEvent.translationX)
                }
                  
                if (affectMultiple.current) {
                  affectMultiple.current({
                    isPositive: y > 0,
                    target: Math.abs(Math.ceil(y / width) - 1),
                    key: id,
                    translationX: evt.nativeEvent.translationX,
                  })
                }
              }}
              minDist={10}
              activeOffsetX={activeOffsetX}
              onHandlerStateChange={evt => {
                const state = evt.nativeEvent.state
                
                if (state === State.END) {
                  cleanUp()
                  if (!activated.current) {
                    activate(evt.nativeEvent.translationX)
                  }
                } else if (state === State.BEGAN) {
                  activated.current = false
                  cleanUp()
                }
              }}
            >
              <Animated.View
                style={[
                  s.GestureWrapper,
                  {
                    height: deleteValue.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width, 0],
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
                  active={active}
                  deleteValue={deleteValue.current}
                  
                  data={data}
                  lastReview={lastReview}
                  showLastReviewDate={showLastReviewDate}
                  showNextReviewDate={showNextReviewDate}
                  showCreationDate={showCreationDate}
                  reviewNumber={reviewNumber}
                  creationDate={creationDate}
                  api={api}
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
