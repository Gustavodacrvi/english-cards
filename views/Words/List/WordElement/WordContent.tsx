

import React, { useMemo } from 'react'
import { View, Animated, Text, StyleSheet } from 'react-native'
import { backgroundColor, faded, darkBackgroundColor } from '../../../../styles/colors'
import { animateProperty } from '../../../../animations'
import { LingueTranslationInterface, SimpleTranslationData } from '../../../../interfaces'

interface Props {
  touchX: Animated.Value;
  deleteValue: Animated.Value;
  active: boolean;
  creationDate: string;
  api: 'linguee' | 'simple',
  data: LingueTranslationInterface | SimpleTranslationData;
}

function WordContent({
  touchX,
  deleteValue,
  active,
  api,
  data,
  creationDate,
}: Props) {

  const name = useMemo(() => {
    switch (api) {
      case 'linguee': {
        return (data as LingueTranslationInterface).query 
      }
      case 'simple': {
        return (data as SimpleTranslationData).term
      }
    }
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
          <View>
            <Animated.Text style={[
              s.Info,
              {
                color: animateProperty(active ? darkBackgroundColor : faded),
              },
            ]}>{translation}</Animated.Text>
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
  Content: {
    height: 25,
    display: 'flex',
    marginLeft: 8,
    marginBottom: 2,
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


export default React.memo(WordContent)
