

import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { backgroundColor } from '../../../../styles/colors'
import { animateProperty } from '../../../../animations'
import { LingueTranslationInterface, SimpleTranslationData } from '../../../../interfaces'
import { getWordName } from '../../../../utils'
import WordContentRendering from './WordContentRendering'

interface Props {
  touchX: Animated.Value;
  active: boolean;
  showCreationDate: boolean;
  showNextReviewDate: boolean;
  showLastReviewDate: boolean;
  reviewNumber: null | number;
  creationDate: string;
  lastReview: null | string;
  api: 'linguee' | 'simple',
  data: LingueTranslationInterface | SimpleTranslationData;
}

function WordContent({
  touchX,
  active,
  showCreationDate,
  api,
  reviewNumber,
  showNextReviewDate,
  showLastReviewDate,
  data,
  lastReview,
  creationDate,
}: Props) {

  const name = getWordName({api, data} as any)
  let translation
  switch (api) {
    case 'linguee': {
      translation = (data as LingueTranslationInterface).words[0].translations[0].term
    }
    case 'simple': {
      translation = (data as SimpleTranslationData).translation
    }
  }

  return (
    <View
      style={s.WordElement}
    >
      <Animated.View
        style={[
          s.Wrapper,
          {
            transform: [{translateX: touchX}],
          },
        ]}
      >
        <Animated.View
          style={[
            s.TransparentBack,
            {
              opacity: animateProperty(active ? 1 : 0, true),
            }
          ]}
        >

        </Animated.View>
        <Animated.View
          style={s.Content}
        >
          <WordContentRendering
            name={name}
            active={active}
            translation={translation}
            showLastReviewDate={showLastReviewDate}
            lastReview={lastReview}
            showCreationDate={showCreationDate}
            creationDate={creationDate}
            showNextReviewDate={showNextReviewDate}
            reviewNumber={reviewNumber}
          />
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const s = StyleSheet.create({
  TransparentBack: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  WordElement: {
    position: 'relative',
  },
  Wrapper: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 8,
  },
  Content: {
    height: 25,
    display: 'flex',
    marginLeft: 8,
    marginBottom: 2,
    justifyContent: 'space-around',
  },
})


export default WordContent
