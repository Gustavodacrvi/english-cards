

import React, { useEffect, useState, useRef, createRef } from 'react'

import { View, InteractionManager } from 'react-native'
import ListRenderer from './ListRenderer'

interface Props {
  infoObj?: {
    saved: boolean;
    lastReview: boolean;
    nextReview: boolean
  };
  list: Array<{name: string; translation: string}>;
  id: string;
  direction: 'vertical' | 'horizontal';
  width: number;
  selected: string[];
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
}

const initalTransitionData = {toFlip: [], toAdd: [], toRemove: [], finalList: []}

function List({list, direction, id, leftAction, width, rightAction, onPress, selected = []}: Props) {

  const refs = useRef([])
  const isTransitioning = useRef(false)
  const transitionData = useRef(initalTransitionData)
  
  const [model, setModel] = useState(list)

  useEffect(() => {

    const toAdd = list.filter(old => !model.some(obj => old[id] === obj[id])).map(obj => obj[id])
    const toRemoveObjs = model.filter(old => !list.some(obj => old[id] === obj[id]))
    const toRemove = toRemoveObjs.map(obj => obj[id])
    const getFlipped = () => {
      const dontChange = model.filter(obj => !toRemove.includes(obj[id]) && !toAdd.includes(obj[id])).map(el => el[id])

      return dontChange.map(key => {
        let oldIndex = model.findIndex(obj => obj[id] === key)
        let newIndex = list.findIndex(obj => obj[id] === key)
        let multiplier = width
        const getNumberOfRemovedElementsBeforeKey = () => {
          const oldEls = new Set()
          for (const el of model) {
            if (el[id] === key)
              break
            oldEls.add(el[id])
          }
          return toRemove.reduce((tot, el) => oldEls.has(el) ? tot + 1 : tot , 0)
        }
        const getNumberOfRemovedElementsAfterKey = () => {
          const oldEls = new Set()
          for (const el of list) {
            if (el[id] === key)
              break
            oldEls.add(el[id])
          }
          return toAdd.reduce((tot, el) => oldEls.has(el) ? tot + 1 : tot , 0)
        }

        const translate = ((oldIndex - newIndex) - getNumberOfRemovedElementsBeforeKey() + getNumberOfRemovedElementsAfterKey()) * multiplier
        
        if (translate)
          return {
            translate,
            key,
          }
      }).filter(el => el)
    }
    const toFlip = getFlipped()

    const finalList = list.slice()

    const transitionArray = finalList.slice()

    toRemoveObjs.forEach(obj => {
      const i = model.findIndex(old => old[id] === obj[id])
      transitionArray.splice(i, 0, obj)
    })

    if (toAdd.length || toRemove.length || toFlip.length) {
      isTransitioning.current = true
      transitionData.current = {toRemove, toAdd, toFlip, finalList}
      setModel(transitionArray)
    }
    
  }, [list])

  useEffect(() => {
    refs.current = refs.current.slice(0, model.length)
    const getCompRefById = (key: string): any => {
      return refs.current.find(ref => ref && ref.id === key)
    }
    if (isTransitioning.current) {
      const {toRemove, toFlip, toAdd, finalList} = transitionData.current

      Promise.all([
        ...toRemove.map(id => getCompRefById(id).runLeaveAnimation()),
        ...toAdd.map(id => getCompRefById(id).runEnterAnimation()),
        ...toFlip.map(({translate, key}) => getCompRefById(key).runFlipAnimation(translate)),
      ]).then(() => {
        setModel(finalList)
      })
      
    }
    isTransitioning.current = false
    transitionData.current = initalTransitionData
  }, [model])

  return (
    <View
      style={{
        marginTop: 30,
        position: 'relative',
      }}
    >
      <ListRenderer
        list={model}
        refs={refs}
        leftAction={leftAction}
        rightAction={rightAction}
        transformProperty={direction === 'vertical' ? 'translateY' : 'translateX'}
        id={id}
        width={width}
        onPress={onPress}
        selected={selected}
        isTransitioning={isTransitioning}
        transitionData={transitionData}
      />
    </View>
  )
}

export default React.memo(List)
