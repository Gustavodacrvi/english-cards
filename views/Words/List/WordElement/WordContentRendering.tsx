


import React, { useRef } from 'react'
import { View, Text, StyleSheet, TextStyle } from 'react-native'
import { faded, darkBackgroundColor } from '../../../../styles/colors'
import { getHumanReadable, getNextReviewDate, memoize } from '../../../../utils'
import Icon from '../../../../components/Icon'

interface Props {
  active: boolean;
  translation: string;
  showLastReviewDate: boolean;
  showNextReviewDate: boolean;
  lastReview: null | string;
  showCreationDate: boolean;
  creationDate: string;
  name: string;
  reviewNumber: null | number;
}

function WordContent({
  active,
  translation,
  showLastReviewDate,
  name,
  lastReview,
  showCreationDate,
  creationDate,
  showNextReviewDate,
  reviewNumber,
}: Props) {

  const textStyles: TextStyle[] = [
    s.Info,
    {color: active ? darkBackgroundColor : faded},
  ]
  const bigText = [
    s.BigText,
    {
      color: active ? darkBackgroundColor : 'white',
    },
  ]
  const infoText = [textStyles, s.InfoText]
  
  return (
    <>
      <View>
        <Text style={bigText}>{name}</Text>
      </View>
      <View
        style={s.InfoWrapper}
      >
        <Text style={textStyles}>{translation}</Text>
        <View
          style={s.RightSection}
        >
          {(showLastReviewDate && lastReview) && <View
            style={s.InfoOption}
          >
            <Icon
              icon="book"
              width={9}
              animate={false}
            />
            <Text style={infoText}>
              {getHumanReadable(lastReview)}
            </Text>
          </View>}
          {showCreationDate && <View
            style={s.InfoOption}
          >
            <Icon
              icon="saved"
              width={9}
              animate={false}
            />
            <Text style={infoText}>
              {getHumanReadable(creationDate)}
            </Text>
          </View>}
          {showNextReviewDate && <View
            style={s.InfoOption}
          >
            <Icon
              icon="notification"
              width={9}
              animate={false}
            />
            <Text style={infoText}>
              {getHumanReadable(
                getNextReviewDate({
                  lastReview,
                  reviewNumber,
                })
              )}
            </Text>
          </View>}
        </View>
      </View>
    </>
  )
}

const s = StyleSheet.create({
  RightSection: {
    display: 'flex',
    flexDirection: 'row',
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

export default WordContent
