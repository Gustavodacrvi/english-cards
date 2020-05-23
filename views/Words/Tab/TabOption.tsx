
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
  icon: IconInterface;
  setTab: (name: 'saved' | 'forgotten' | 'learned') => void;
}

function TabOption({active, name, icon, tabName, setTab}: Props) {

  return (
    <View
      style={[
        s.Wrapper,
      ]}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(primary, false)}
        useForeground={!active}

        onPress={() => setTab(tabName)}
      >
        <View style={s.Content}>
          <Animated.View
            style={[
              s.Background,
              {
                backgroundColor: primary,
                opacity: animateProperty(active ? 1 : 0, true),
              }
            ]}
          ></Animated.View>

          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={[
              s.Text,
              {
                color: active ? darkBackgroundColor : 'white'
              },
            ]}
          >
            {name}
          </Text>
          <View
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingRight: 10,
              paddingLeft: 8,
            }}
          >
            <Icon
              {...icon}
              width={16}
              color={active ? darkBackgroundColor : null}
              animate={false}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 8,
  },
  Content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    overflow: 'hidden',
    marginLeft: 12,
    color: darkBackgroundColor,
  },
  Background: {
    backgroundColor: primary,
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  }
})

export default TabOption
