

import React from 'react'
import { View, Animated, Text, StyleSheet } from 'react-native'
import { backgroundColor, faded } from '../../../../styles/colors'

interface Props {
  touchX: Animated.Value;
  deleteValue: Animated.Value;
  name: string;
  translation: string;
}

function WordContent({touchX, deleteValue, name, translation}: Props) {
  return (
    <View>
      <Animated.View
        style={[
          s.Wrapper,
          {
            transform: [{translateX: touchX}],
          }
        ]}
      >
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
            <Text style={s.BigText}>{name}</Text>
          </View>
          <View>
            <Text style={s.Info}>{translation}</Text>
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
    paddingLeft: 8,
    height: '100%',
    paddingBottom: 2,
    borderRadius: 8,
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


export default React.memo(WordContent)
