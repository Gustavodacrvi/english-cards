

import React, { useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { darkBackgroundColor } from '../../../styles/colors'
import TabOption from './TabOption'
import TabBackground from './TabBackground'
import { IconInterface } from '../../../interfaces'

interface Props {
  tab: 'saved' | 'learned' | 'forgotten';
  setTab: (name: 'saved' | 'forgotten' | 'learned') => void;
}

function TabWrapper({tab, setTab}: Props) {
  const saved: IconInterface = {icon: 'saved'}
  const book: IconInterface = {icon: 'book'}
  const notification: IconInterface = {icon: 'notification-dash'}
  const [width, setWidth] = useState(0)

  const learned = 138
  const forgotten = 154
  
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

        <TabBackground
          left={{
            saved: 0,
            learned: (width / 2) - (learned / 2) -4,
            forgotten: width - forgotten,
          }[tab]}
          width={{
            saved: 108,
            learned,
            forgotten,
          }[tab]}
        />

        <TabOption
          active={tab === "saved"}
          name="Salvas"
          textWidth={50}
          setTab={setTab}
          tabName='saved'
          icon={saved}
          />
        <TabOption
          active={tab === "learned"}
          name="Aprendidas"
          textWidth={83}
          setTab={setTab}
          tabName='learned'
          icon={book}
          />
        <TabOption
          active={tab === "forgotten"}
          name="Esquecidas"
          textWidth={86}
          setTab={setTab}
          tabName='forgotten'
          icon={notification}
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
  },
  TabBar: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    height: '100%',
  },
})

export default React.memo(TabWrapper)
