

import React from 'react'

import { WordData } from '../../../interfaces'
import { View } from 'react-native'
import WordElement from './WordElement'

interface Props {
  infoObj?: {
    saved: boolean;
    lastReview: boolean;
    nextReview: boolean
  };
  list: Array<{name: string; translation: string}>;
}

function List({list}: Props) {
  return (
    <View
      style={{
        overflow: 'visible',
        marginTop: 30,
      }}
    >
      {
        list.map(obj => <WordElement {...obj}/>)
      }
    </View>
  )
}

export default React.memo(List)
