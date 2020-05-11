
import React from 'react'

import { View, Text, StyleSheet, Animated, TouchableNativeFeedback } from 'react-native'
import { IconInterface } from '../../../interfaces'
import Icon from '../../../components/Icon'
import { darkBackgroundColor, primary } from '../../../styles/colors'
import { animateProperty } from '../../../animations'

interface Props {
  active: boolean;
  name: string;
  tabName: 'saved' | 'forgotten' | 'learned';
  textWidth: number;
  icon: IconInterface;
  setTab: (name: 'saved' | 'forgotten' | 'learned') => void;
}

function TabOption({active, name, icon, textWidth, tabName, setTab}: Props) {

  return (
    <View
      style={[
        s.Wrapper,
      ]}
    >
      <Animated.Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[
          s.Text,
          {
            width: animateProperty(active ? textWidth : 0, false, {
              bounciness: 0,
              speed: 16,
            } as any),
          },
        ]}
      >
        {name}
      </Animated.Text>
      <View
        style={{
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={!active}

          onPress={() => setTab(tabName)}
        >
          <View
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingRight: 8,
              paddingLeft: 8,
            }}
          >
            <Icon
              {...icon}
              width={18}
              color={active ? darkBackgroundColor : null}
              animate={false}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    overflow: 'hidden',
    color: darkBackgroundColor,
  }
})

export default React.memo(TabOption)
