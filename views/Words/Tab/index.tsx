

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { darkBackgroundColor } from '../../../styles/colors'
import TabOption from './TabOption'
import TabBackground from './TabBackground'

interface Props {
  tab: 'saved' | 'learned' | 'forgotten';
  setTab: (name: 'saved' | 'forgotten' | 'learned') => void;
}

function TabWrapper({tab, setTab}: Props) {
  return (
    <View
      style={s.Wrapper}
    >
      <View
        style={s.TabBar}
      >

        <TabBackground
          left={{
            saved: 0,
            learned: 76,
            forgotten: 142,
          }[tab]}
          width={{
            saved: 108,
            learned: 138,
            forgotten: 154,
          }[tab]}
        />

        <TabOption
          active={tab === "saved"}
          name="Salvas"
          textWidth={50}
          setTab={setTab}
          tabName='saved'
          icon={{icon: 'saved'}}
          />
        <TabOption
          active={tab === "learned"}
          name="Aprendidas"
          textWidth={83}
          setTab={setTab}
          tabName='learned'
          icon={{icon: 'book'}}
          />
        <TabOption
          active={tab === "forgotten"}
          name="Esquecidas"
          textWidth={86}
          setTab={setTab}
          tabName='forgotten'
          icon={{icon: 'notification-dash'}}
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
    paddingLeft: 14,
    paddingRight: 14,
    width: '100%',
    height: '100%',
  },
})

export default React.memo(TabWrapper)
