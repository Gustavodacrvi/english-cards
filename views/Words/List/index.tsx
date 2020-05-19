

import React, { useEffect, useState, useRef, createRef } from 'react'

import { View, InteractionManager } from 'react-native'
import ListRenderer from './ListRenderer'
import { WordInterface } from '../../../interfaces'

interface Props {
  infoObj?: {
    saved: boolean;
    lastReview: boolean;
    nextReview: boolean
  };
  list: WordInterface[];
  id: string;
  showCreationDate: boolean;
  showNextReviewDate: boolean;
  showLastReviewDate: boolean;
  activateAnimations: boolean;
  direction: 'vertical' | 'horizontal';
  width: number;
  selected: string[];
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
}

const initalTransitionData = {toFlip: [], toAdd: [], toRemove: [], finalList: []}

function List({list, direction, id, activateAnimations, showCreationDate, showNextReviewDate, showLastReviewDate, leftAction, width, rightAction, onPress, selected = []}: Props) {

  const refs = useRef([])
  const isTransitioning = useRef(false)
  const transitionData = useRef(initalTransitionData)
  
  const [model, setModel] = useState(list)
  const affectSourceIndex = useRef(null)
  const lastSourceKey = useRef(null)
  const lastTarget = useRef(null)
  const isAnimatingRefs = useRef({})

  const cleanUp = useRef(() => {
    isAnimatingRefs.current = {}
    affectSourceIndex.current = null
    lastTarget.current = null
    lastSourceKey.current = null
  })

  const pullComponent = (index: number, translationX: number) => {
    const ref = refs.current[index]
    if (!ref || isAnimatingRefs.current[ref.id])
      return;

    ref.pull(translationX)
  }
  
  const affectMultipleFunction = ({key, translationX, target, isPositive}) => {
    if (!affectSourceIndex.current || lastSourceKey.current !== key) {
      affectSourceIndex.current = model.findIndex(obj => obj[id] === key)
      lastSourceKey.current = affectSourceIndex.current
    }
    if (affectSourceIndex.current && target !== 0 && (lastTarget.current === null || lastTarget.current !== target)) {
      lastTarget.current = target
      const source = affectSourceIndex.current
      let index = isPositive ? source + target : source - target
      pullComponent(index, translationX)
    }
  }
  const affectMultiple = useRef(affectMultipleFunction)

  useEffect(() => {
    if (!activateAnimations) {
      setModel(list)
      return;
    }

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
    if (!activateAnimations)
      return;
    
    cleanUp.current()
    affectMultiple.current = affectMultipleFunction
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
        showCreationDate={showCreationDate}
        showNextReviewDate={showLastReviewDate}
        showLastReviewDate={showNextReviewDate}
        affectMultiple={affectMultiple}
        leftAction={leftAction}
        cleanUp={cleanUp.current}
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
