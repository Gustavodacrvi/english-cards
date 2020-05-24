

import React, { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { darkBackgroundColor, backgroundColor, primary } from '../../../styles/colors'
import Icon from '../../../components/Icon'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

function HomeCard({
  tab,
} : {
  tab: 'saved' | 'review' | 'forgotten';
}) {

  const data = {
    saved: 4,
    review: 0,
    forgotten: 0,
  }

  const iconText = useRef({
    saved: 'saved',
    review: 'notification',
    forgotten: 'notification-dash',
  })
  const contentText = useRef({
    saved: `Aumente o seu vocabulário estudando as novas palavras. Elas são adicionadas por meio da extensão do Google Chrome ou manualmente na aba "Palavras".`,
    review: `Nâo adiante aprender novas coisas se você esquece o que já aprendeu não é verdade? Faça uma rápida revisão das palavras que aprendeu, elas se repetem periodicamente em uma curva exponencial.`,
    forgotten: `As palavras que não forem revisadas serão tratadas como se fossem palavras novas, pois as revisões não foram feitas e elas não foram para a memoria de longo prazo apropriadamente.`,
  })
  const emptyText = useRef({
    saved: `Você não tem nenhuma palavra salva, elas são adicionadas por meio da extensão do Google Chrome ou manualmente na aba "Palavras".`,
    review: 'Nâo há palavras para revisar hoje, você será notificado quando houver revisões.',
    forgotten: `Você não esqueceu de revisar nenhuma palavra, você será notificado quando esquecer.`,
  })
  
  return (
    <View
      style={s.HomeCard}
    >
      {
        data[tab] && (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(primary, false)}
            useForeground={true}
            delayPressIn={0}
            delayPressOut={0}
          >
            <View
              style={s.TouchableWrapper}
            >
              <View
                style={s.Wrapper}
              >
                
                <View
                  style={s.TitleWrapper}
                >
                  <Icon
                    icon={iconText.current[tab] as any}
                  />
                  <Text
                    style={s.Title}
                  >
                    {{
                      saved: `Estudar ${data['saved']} palavras`,
                      review: `Revisar ${data['review']} palavras`,
                      forgotten: `Reaprender ${data['forgotten']} palavras`,
                    }[tab]}
                  </Text>
                </View>
                <Text
                  style={s.Content}
                >
                  {contentText.current[tab]}
                </Text>
                <Text
                  style={s.Duration}
                >
                  {{
                    saved: `20 minutos`,
                    review: `10 minutos`,
                    forgotten: `5 minutos`,
                  }[tab]}
                </Text>
    
              </View>
            </View>
          </TouchableNativeFeedback>
        ) || (
          <View
            style={s.Centralize}
          >
            <View
              style={s.EmptyIconWrapper}
            >
              <Icon
                icon={iconText.current[tab] as any}
                color={darkBackgroundColor}
                width={100}
                animate={false}
              />
            </View>
            <View
              style={s.EmptyTextWrapper}
            >
              <Text
                style={s.EmptyText}
              >
                {emptyText.current[tab]}
              </Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

const s = StyleSheet.create({
  Centralize: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  EmptyIconWrapper: {
    position: 'absolute',
  },
  EmptyTextWrapper: {
    width: 235,
  },
  EmptyText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  TitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Title: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  Content: {
    fontFamily: 'OpenSans-Semibold',
  },
  Duration: {
    fontFamily: 'OpenSans-Bold',
    color: primary,
    fontSize: 24,
  },
  Wrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  TouchableWrapper: {
    padding: 20,
  },
  HomeCard: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: 30,
    marginTop: 40,
    backgroundColor: backgroundColor,
    height: 250,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10,
  },
})

export default React.memo(HomeCard)
