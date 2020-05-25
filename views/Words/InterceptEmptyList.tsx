

import React from 'react'
import { Animated, View, Text, StyleSheet } from 'react-native'
import Icon from '../../components/Icon'
import { darkBackgroundColor, backgroundColor } from '../../styles/colors'
import { animateProperty } from '../../animations'

function InterceptEmptyList({
  tab, show,
}: {
  tab: string;
  show: boolean;
}) {
  return (
    <Animated.View
      style={[
        s.ListLoading,
        {
          opacity: animateProperty(show ? 1 : 0, true)
        }
      ]}
      pointerEvents="none"
    >
      <View
        style={s.EmptyWrapper}
      >
        <Icon
          icon={{
            saved: "saved",
            learned: "book",
            forgotten: "notification-dash",
          }[tab] || tab}
          width={140}
          primaryColor={darkBackgroundColor}
          secondaryColor={darkBackgroundColor}
        />
        <View
          style={s.TextWrapper}
        >
          <Text
            style={s.Text}
          >
            {{
              saved: "Você pode adicionar palavras pela extensão do Google Chrome ou manualmente pelo botão.",
              learned: "As suas palavras aprendidas estarão aqui.",
              forgotten: "As palavras que não foram feitas revisões aparecerão aqui.",
              archive: "Após revisar alguma palavra 12 vezes, suas notificações serão desativadas e irá aparecer aqui."
            }[tab]}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

const s = StyleSheet.create({
  ListLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor,
  },
  ContentWrapper: {
    flex: 1,
    paddingBottom: 73,
  },
  EmptyWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextWrapper: {
    position: 'absolute',
    maxWidth: 290,
  },
  Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default React.memo(InterceptEmptyList)
