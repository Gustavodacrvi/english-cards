
import React, { useRef, forwardRef, useImperativeHandle, MutableRefObject } from 'react'

import { StyleSheet, Animated, TouchableNativeFeedback, View, Easing } from 'react-native'
import { primary } from '../../../../styles/colors'
import { PanGestureHandler, State, Directions } from 'react-native-gesture-handler'
import GestureBackground from './GestureBackground'
import WordContent from './WordContent'
import { WordInterface } from '../../../../interfaces'

interface Props {
  leftAction: (id: string) => void | null;
  rightAction: (id: string) => void | null;
  onPress: (id: string) => void | null;
  uid: string;
  height: number;
  active: boolean;
  showNextReviewDate: boolean;
  showLastReviewDate: boolean;
  showCreationDate: boolean;
}

const WordElement = forwardRef(({
  height,
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
  active,
  uid,
}: Props & WordInterface, ref) => {

  const touchX = useRef(new Animated.Value(0))

  const activeOffsetX = 45
  
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
          leftAction(uid)
        } else if (x < 0) {
          rightAction(uid)
        }
      }
    })
  }

  const onHandlerStateChange = evt => {
    const state = evt.nativeEvent.state
    
    if (state === State.END) {
      activate(evt.nativeEvent.translationX)
    }
  }

  return (
    <View
      style={s.WordElement}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(primary, true)}
        useForeground={true}
        onPress={evt => {
          evt.stopPropagation()
          onPress(uid)
        }}
      >
        <View>
          <PanGestureHandler
            maxPointers={1}
            onGestureEvent={leftAction && Animated.event([{nativeEvent: {translationX: touchX.current}}], { useNativeDriver: true }) || (() => {})}
            activeOffsetX={activeOffsetX}
            minDist={25}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[
                s.GestureWrapper,
                {
                  height,
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
    </View>
  )
})

const s = StyleSheet.create({
  GestureWrapper: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  WordElement: {
    overflow: 'hidden',
  },
})

export default React.memo(WordElement)
