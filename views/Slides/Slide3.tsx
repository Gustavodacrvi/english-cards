
import React from 'react'
import { View, StyleSheet, Text, Animated } from "react-native"
import { primary } from '../../styles/colors'
import { animateProperty } from '../../animations'

import slideBuilder from './slideBuilder'
import { s, getTransformedData } from './utils'

function Slide2({slide}: {slide: 0 | 1 | 2}) {

  const active = slide === 2
  
  return (
    <View style={styles.Wrapper}>
      <Animated.Text
        style={[
          styles.Hero,
          s.Hero2,
          {
            transform: [
              {
                translateY: animateProperty(active ? 0 : -75, 400, true),
              }
            ]
          }
        ]}
      >
        Revisões Periódicas
      </Animated.Text>
      <Animated.Text
        style={[
          s.Normal,
          styles.Text,
          {
            transform: [
              {
                translateX: animateProperty(active ? 0 : 330, 400, true),
              }
            ]
          }
        ]}
      >
        Pesquisas indicaram que usando repetições espaçadas fica bem mais fácil de aprendermos.
        Por isso, após memorizar as palavras, você será notificado regularmente para revisá-las, encontre, memorize, revise e aprenda!
        Você será notificado nestes intervalos de tempo:
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  Text: {
    marginBottom: 80,
  },
  Hero: {
    position: 'absolute',
    top: 100,
    width: 115,
  },
})

export default slideBuilder(Slide2)
