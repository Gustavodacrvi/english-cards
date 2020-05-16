

import React, { useMemo } from 'react'
import { View, Animated, Text, StyleSheet, TextStyle } from 'react-native'
import { backgroundColor, faded, darkBackgroundColor } from '../../../../styles/colors'
import { animateProperty } from '../../../../animations'
import { LingueTranslationInterface, SimpleTranslationData } from '../../../../interfaces'
import { getHumanReadable, getNextReviewDate, getWordName } from '../../../../utils'
import Icon from '../../../../components/Icon'

interface Props {
  touchX: Animated.Value;
  deleteValue: Animated.Value;
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
  deleteValue,
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

  const name = useMemo(() => {
    return getWordName({api, data} as any)
  }, [api, data])
  const translation = useMemo(() => {
    switch (api) {
      case 'linguee': {
        return (data as LingueTranslationInterface).words[0].translations[0].term
      }
      case 'simple': {
        return (data as SimpleTranslationData).translation
      }
    }
  }, [api, data])

  const textStyles: TextStyle[] = [
    s.Info,
    {color: active ? darkBackgroundColor : faded},
  ]
  
  return (
    <View
      style={{
        position: 'relative',
      }}
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
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: animateProperty(active ? 1 : 0, true),
          }}
        >

        </Animated.View>
        <Animated.View
          style={[
            s.Content,
            {
              opacity: deleteValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              })
            }
          ]}
        >
          <View>
            <Animated.Text style={[
              s.BigText,
              {
                color: animateProperty(active ? darkBackgroundColor : 'white'),
              },
            ]}>{name}</Animated.Text>
          </View>
          <View
            style={s.InfoWrapper}
          >
            <Text style={textStyles}>{translation}</Text>
            <View
              style={s.RightSection}
            >
              {(showLastReviewDate && lastReview) ? <View
                style={s.InfoOption}
              >
                <Icon
                  icon="book"
                  width={9}
                />
                <Text style={[textStyles, s.InfoText]}>
                  {getHumanReadable(lastReview)}
                </Text>
              </View> : undefined}
              {showCreationDate ? <View
                style={s.InfoOption}
              >
                <Icon
                  icon="saved"
                  width={9}
                />
                <Text style={[textStyles, s.InfoText]}>
                  {getHumanReadable(creationDate)}
                </Text>
              </View> : undefined}
              {showNextReviewDate ? <View
                style={s.InfoOption}
              >
                <Icon
                  icon='notification'
                  width={9}
                />
                <Text style={[textStyles, s.InfoText]}>
                  {getHumanReadable(
                    getNextReviewDate({
                      lastReview,
                      reviewNumber,
                    })
                  )}
                </Text>
              </View> : undefined}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 8,
  },
  RightSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  Content: {
    height: 25,
    display: 'flex',
    marginLeft: 8,
    marginBottom: 2,
    justifyContent: 'space-around',
  },
  InfoOption: {
    marginLeft: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  InfoText: {
    fontSize: 9,
    marginTop: 0,
    marginLeft: 4,
  },
})


export default React.memo(WordContent)
