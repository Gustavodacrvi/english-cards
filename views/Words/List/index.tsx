

import React, { useEffect, useState, useRef, createRef } from 'react'

import { View } from 'react-native'
import WordElement from './WordElement/'
/*     const getCompRefById = (key: string): object | undefined => {
      // console.log(refs.current[2].data)
      const res = refs.current.find(el => el.data[id] === key)
      if (res)
        return res.current
    } */
    
    // console.log(getCompRefById('Arrows'))
  
/*     if (refs.current[2].current.runLeaveAnimation)
      console.log(refs.current[2].current.runLeaveAnimation().then(() => console.log('animation complete'))) */

interface Props {
  infoObj?: {
    saved: boolean;
    lastReview: boolean;
    nextReview: boolean
  };
  list: Array<{name: string; translation: string}>;
  id: string;
}

const initalTransitionData = {toFlip: [], toAdd: [], toRemove: [], finalList: []}

function List({list, id}: Props) {

  const refs = useRef([])
  const isTransitioning = useRef(false)
  const transitionData = useRef(initalTransitionData)
  
  const [model, setModel] = useState(list)

  refs.current = refs.current.slice(0, model.length)

  const getCompRefById = (key: string): any => {
    return refs.current.find(ref => ref && ref.id === key)
  }

  useEffect(() => {

    const toAdd = list.filter(old => !model.some(obj => old[id] === obj[id])).map(obj => obj[id])
    const toRemoveObjs = model.filter(old => !list.some(obj => old[id] === obj[id]))
    const toRemove = toRemoveObjs.map(obj => obj[id])
    const getFlipped = () => {
      const dontChange = model.filter(old => list.some(obj => old[id] === obj[id])).map(el => el[id])
      const couples = []
      dontChange.forEach(key => {
        if (couples.some(arr => arr.includes(key)))
          return;
        let oldElement
        for (let i = 0;i < list.length;i++)
          if (list[i][id] === key && model[i]) {
            oldElement = model[i][id]
            break
          }

        
        const arentUndefinedAndArentBeingAddedOrRemoved = oldElement && oldElement !== key && !couples.includes(oldElement) && !toRemove.includes(key) && !toRemove.includes(oldElement)
        
        if (arentUndefinedAndArentBeingAddedOrRemoved) {

          const oldElIndex = model.findIndex(obj => obj[id] === oldElement)
          const newElIndex = list.findIndex(obj => obj[id] === oldElement)

          const oldKeyIndex = model.findIndex(obj => obj[id] === key)
          const newKeyIndex = list.findIndex(obj => obj[id] === key)

          const thereWasFlip = Math.sign(oldElIndex - oldKeyIndex) !== Math.sign(newElIndex - newKeyIndex)
          if (thereWasFlip)
            couples.push([oldElement, key])
        }
      })

      
      return couples
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
    if (isTransitioning.current) {
      const {toRemove, toFlip, toAdd, finalList} = transitionData.current

      Promise.all([
        ...toRemove.map(id => getCompRefById(id).runLeaveAnimation()),
        ...toAdd.map(id => getCompRefById(id).runEnterAnimation()),
        ...toFlip.map(([el1, el2]) => {
          const ref1 = getCompRefById(el1)
          const ref2 = getCompRefById(el2)

          const x = ref1.layout.x - ref2.layout.x
          const y = ref1.layout.y - ref2.layout.y

          return Promise.all([
            ref1.runFlipAnimation({x, y}),
            ref2.runFlipAnimation({x: -x, y: -y}),
          ])
        }),
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
      }}
    >
      {
        model.map((obj, i) =>
          <WordElement
            key={obj[id]}
            willEnter={isTransitioning.current && transitionData.current.toAdd.includes(obj[id])}
            ref={el => refs.current[i] = el}
            id={obj[id]}
            {...obj}
          />
        )
      }
    </View>
  )
}

export default List