
import React, { useRef, useCallback, useEffect, createRef } from 'react'

import WordElement from './WordElement'

interface Props {
  list: any[];
  leftAction: (id: string) => void;
  rightAction: (id: string) => void;
  onPress: (id: string) => void;
  selected: string[];
  id: string;
  isTransitioning: any;
  transitionData: any;
  refs: any;
}

function ListRenderer({list, isTransitioning, transitionData, leftAction, id, rightAction, onPress, selected, refs}: Props) {

  
  const functionRefs = useRef({})

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
          active={selected.includes(obj[id])}
          ref={getRef}
        
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

