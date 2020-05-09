
import React from 'react'
import { View, Animated } from "react-native"
import { primary } from '../../styles/colors'
import { animateProperty } from '../../animations'

import slideBuilder from './slideBuilder'
import { s } from './utils'

function Slide2({slide}: {slide: 0 | 1 | 2}) {

  const transformed2 = [
    {
      transform: [
        {
          translateX: animateProperty(slide < 1 ? 330 : 0, true),
        },
        {
          translateY: animateProperty(slide > 1 ? 480 : 0, true),
        },
      ],
    }
  ]
  const transformed1 = [
    {
      transform: [
        {
          translateX: animateProperty(slide === 1 ? 0 : -330, true),
        },
      ],
    }
  ]
  
  return (
    <View>
      <Animated.Text
        style={[
          s.Normal,
          s.Bottom,
          transformed1,
          s.Hero2,
        ]}
      >
        O que são Flash Cards?
      </Animated.Text>
      <Animated.Text
        style={[
          s.Normal,
          s.Bottom,
          transformed1,
        ]}
      >
        Os Flash Cards facilita a memorização de fatos específicos e é utilizado principalmente no aprendizado de uma nova linguagem.
      </Animated.Text>

      <Animated.Text
        style={[
          s.Normal,
          s.Bottom,
          transformed2,
          s.Hero2,
        ]}
      >
        Como funciona?

      </Animated.Text>
      <Animated.Text
        style={[
          s.Normal,
          s.Bottom,
          transformed2,
        ]}
      >
        Você cria cartas, de um lado a pergunta, e no outro a resposta, você então tenta descobrir a resposta certa, depois que chutar, vire a carta para ver se estava certo.
        Após realizar esse processo muitas vezes, uma conexão entre a pergunta e resposta será criada e você irá memorizá-la.
      </Animated.Text>
    </View>
  )
}

export default slideBuilder(React.memo(Slide2))
