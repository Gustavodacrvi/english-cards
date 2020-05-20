
import React from 'react'
import { View, StyleSheet, Text, Animated } from "react-native"
import { primary } from '../../styles/colors'
import { animateProperty } from '../../animations'

import slideBuilder from './slideBuilder'
import slide3Svg from './slide3.svg'
import tempo from './tempo.svg'
import { SvgXml } from 'react-native-svg'
import { s, getTransformedData } from './utils'

function Slide2({slide}: {slide: 0 | 1 | 2}) {

  const active = slide === 2

  return (
    <View style={styles.Wrapper}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: animateProperty(slide === 2 ? -160 : 220, true),
            },{
              translateY: animateProperty(slide === 2 ? 0 : -150, true),
            }
          ]
        }}
      >
        <SvgXml
          width='700'
          xml={slide3Svg}
        />
      </Animated.View>
      
      <Animated.Text
        style={[
          styles.Hero,
          s.Hero2,
          {
            transform: [
              {
                translateY: animateProperty(active ? 0 : -75, true),
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
          styles.Margin,
          {
            transform: [
              {
                translateX: animateProperty(active ? 0 : 330, true),
              },
            ]
          }
        ]}
      >
        Pesquisas indicaram que usando repetições espaçadas fica bem mais fácil de aprendermos.
        Por isso, após memorizar as palavras, você será notificado regularmente para revisá-las, encontre, memorize, revise e aprenda!
        Você será notificado nestes intervalos de tempo:
      </Animated.Text>
      <Animated.View
        style={[
            styles.Margin,
            {
              display: 'flex',
              alignItems: 'center',
            },
            {
              transform: [
                {
                  translateX: animateProperty(active ? 0 : 330, true),
                },
              ]
            }
          ]}
      >
        <SvgXml
            width='750'
            xml={tempo}
          />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  Margin: {
    marginBottom: 40,
  },
  Hero: {
    position: 'absolute',
    top: 100,
    width: 115,
  },
})

export default slideBuilder(React.memo(Slide2))
