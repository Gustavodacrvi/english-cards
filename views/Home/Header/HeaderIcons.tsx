

import React, { useEffect, useState, useContext, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { IconInterface } from '../../../interfaces'
import { animateProperty } from '../../../animations'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import NetInfo from '@react-native-community/netinfo'
import { red, primary, darkBackgroundColor } from '../../../styles/colors'
import Icon from '../../../components/Icon'
import { ToastContext } from '../../../contexts/toast'

function HeaderIcons({
  isMenuOpened,
  toggleMenu,
}: {
  isMenuOpened: boolean;
  toggleMenu: () => void;
}) {

  const [isConnected, setConnect] = useState(true)

  useEffect(() => {
    NetInfo.addEventListener(net => setConnect(net.isConnected))
  }, [])

  const {success} = useContext(ToastContext)

  const notification = useRef(() => {
    success('As notificações foram desativadas.', 2500)
  })

  const GetIcon = (icon: IconInterface, onPress: () => void) => (
    <View
      style={s.TouchableWrapper}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(primary, false)}
        useForeground={true}
        delayPressIn={0}
        delayPressOut={0}

        onPress={onPress}
      >
        <View
          style={s.IconWrapper}
        >
          <Icon 
            {...icon}
            width={24}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  )

  return (
    <View
      style={s.HeaderIcons}
    >
      <View>
        {GetIcon({icon: 'user'}, toggleMenu)}
        <Animated.View
            style={[
              s.SpecialIcon,
              {
                opacity: animateProperty(isMenuOpened ? 1 : 0, true),
              },
            ]}
          >
          {GetIcon({icon: 'plus'}, toggleMenu)}
        </Animated.View>
      </View>
      <View
        style={s.WifiWrapper}
      >
        {!isConnected && GetIcon({icon: 'wifi', color: red}, () => {})}
        <View style={{marginLeft: 8}}></View>
        {GetIcon({
          icon: 'notification',
        }, notification.current)}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  HeaderIcons: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  SpecialIcon: {
    backgroundColor: darkBackgroundColor,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  WifiWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  IconWrapper: {
    padding: 4,
  },
  TouchableWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
  },
})

export default React.memo(HeaderIcons)
