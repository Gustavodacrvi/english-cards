

import React from 'react'

import { View, FlatList } from 'react-native'
import { WordInterface } from '../../../interfaces'
import WordElement from './WordElement'

export interface ListRenderingProps {
  list: WordInterface[];
  showCreationDate: boolean;
  showNextReviewDate: boolean;
  showLastReviewDate: boolean;
  height: number;
  selected: string[];
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
}

function List({list, height, showCreationDate, showNextReviewDate, showLastReviewDate, leftAction, rightAction, onPress, selected = []}: ListRenderingProps) {

  return (
    <View
      style={{
        marginTop: 30,
        position: 'relative',
      }}
    >
      <FlatList
        data={list}
        getItemLayout={(data, index) => ({
          length: height, offset: height * index, index,
        })}
        initialNumToRender={20}
        keyExtractor={item => item.uid}
        renderItem={({item}) =>
          <WordElement
            leftAction={leftAction}
            rightAction={rightAction}
            onPress={onPress}
            height={height}
            showNextReviewDate={showLastReviewDate}
            showLastReviewDate={showNextReviewDate}
            showCreationDate={showCreationDate}
            active={selected.includes(item.uid)}
          
            key={item.uid}
            uid={item.uid}
            {...item}
          />
        }
      />
    </View>
  )
}

export default React.memo(List)
