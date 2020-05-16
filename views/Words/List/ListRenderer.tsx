
import React, { useRef, useCallback, useEffect, createRef, MutableRefObject } from 'react'

import WordElement from './WordElement'
import { WordInterface } from '../../../interfaces'

interface Props {
  list: WordInterface[];
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
  selected: string[];
  id: string;
  isTransitioning: any;
  width: number;
  transitionData: any;
  refs: any;
  cleanUp: () => void;
  affectMultiple: {current: ({target, key, translationX, isPositive}: {isPositive: boolean, target: number, key: string, translationX: number}) => void};
  transformProperty: 'translateX' | 'translateY';
}

function ListRenderer({list, cleanUp, width, affectMultiple, isTransitioning, transformProperty, transitionData, leftAction, id, rightAction, onPress, selected, refs}: Props) {
  
  const functionRefs = useRef({})
  const isMagicSelecting = useRef(false)
  const lastListLength = useRef(list.length)
  const uniqueIds = useRef(new Set(list.map(el => el[id])))

  useEffect((): any => {
    if (lastListLength.current !== list.length) {
      lastListLength.current = list.length
      functionRefs.current = {}
    } else if (!list.every(obj => uniqueIds.current.has(obj[id]))) {
      uniqueIds.current = new Set(list.map(el => el[id]))
      functionRefs.current = {}
    }
  }, [list])

  return (
    <>
    {
      list.map((obj, i) => {

        const savedGetRef = functionRefs.current[obj[id]]
        
        const getRef = savedGetRef || (el => refs.current[i] = el)
        if (!savedGetRef)
          functionRefs.current[obj[id]] = getRef

        return <WordElement
          leftAction={leftAction}
          rightAction={rightAction}
          onPress={onPress}
          cleanUp={cleanUp}
          width={width}
          affectMultiple={affectMultiple}
          isMagicSelecting={isMagicSelecting}
          active={selected.includes(obj[id])}
          ref={getRef}
          transformProperty={transformProperty}
        
          key={obj[id]}
          id={obj[id]}
          willEnter={isTransitioning.current && transitionData.current.toAdd.includes(obj[id])}
          {...obj}
        />
      })
    }
    </>
  )
}


export default React.memo(ListRenderer)

