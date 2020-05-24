

import React, { useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { darkBackgroundColor } from '../../../styles/colors'
import TabOption from './TabOption'
import TabBackground from './TabBackground'
import { IconInterface } from '../../../interfaces'
import { memoize } from '../../../utils'

interface Props {
  tab: 'saved' | 'learned' | 'forgotten';
  setTab: (name: 'saved' | 'forgotten' | 'learned') => void;
}

function TabWrapper({tab, setTab}: Props) {
  const saved = useRef({icon: 'saved'} as IconInterface)
  const book = useRef({icon: 'book'} as IconInterface)
  const notification = useRef({icon: 'notification-dash'} as IconInterface)
  const [width, setWidth] = useState(0)

  return (
    <View
      style={s.Wrapper}
    >
      <View
        style={s.TabBar}
        onLayout={evt => {
          setWidth(evt.nativeEvent.layout.width)
        }}
      >

        <TabOption
          active={tab === "saved"}
          name="Salvas"
          setTab={setTab}
          tabName='saved'
          icon={saved.current}
          />
        <TabOption
          active={tab === "learned"}
          name="Aprendidas"
          setTab={setTab}
          tabName='learned'
          icon={book.current}
          />
        <TabOption
          active={tab === "forgotten"}
          name="Esquecidas"
          setTab={setTab}
          tabName='forgotten'
          icon={notification.current}
        />

      </View>


    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    backgroundColor: darkBackgroundColor,
    height: 35,
    borderRadius: 8,
    padding: 4,
    position: 'relative',
  },
  TabBar: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
})

export default React.memo(TabWrapper)
