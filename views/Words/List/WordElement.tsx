
import React from 'react'

import { View, Text } from 'react-native'
import { faded, primary } from '../../../styles/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

function WordElement({name, translation}: {name: string; translation: string}) {
  return (
    <View
      style={{
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(primary, false)}
        useForeground={true}
      >
        <View
          style={{
            height: 43,
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 8,
            paddingBottom: 2,
          }}
        >
          <View
            style={{
              height: 25,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <View>
              <Text style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: 15,
              }}>{name}</Text>
            </View>
            <View>
              <Text style={{
                fontSize: 11,
                marginTop: 4,
                color: faded,
                fontFamily: 'OpenSans-Semibold',
              }}>{translation}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default React.memo(WordElement)
