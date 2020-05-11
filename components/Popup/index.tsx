

import React, { useContext } from 'react'

import { View, TouchableWithoutFeedback } from 'react-native'
import { PopupContext } from '../../contexts/popup'
import { animateOnOff } from '../../animations'

function Popup() {
  
  const {Component, pushPopup} = useContext(PopupContext)
  
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pointerEvents={Component ? 'auto' : 'none'}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      >
        <TouchableWithoutFeedback
          onPress={evt => {
            console.log('34334')
            if (Component)
               pushPopup(null)
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
            }}
          ></View>
        </TouchableWithoutFeedback>
      </View>
        {animateOnOff({
          off: {
            transform: [
              {
                scale: .9,
              },
              {
                translateY: 50,
              },
            ],
            opacity: 0,
          },
          on: {
            transform: [
              {
                scale: 1,
              },
              {
                translateY: 0,
              },
            ],
            opacity: 1,
          },
        }, Component ? <Component/> : null, {useNativeDriver: true})}
    </View>
  )
}

export default Popup
