

import { StyleSheet } from "react-native";
import { primary } from "../../styles/colors";
import { animateProperty } from "../../animations";

export const s = StyleSheet.create({
  Bottom: {
    marginBottom: 38,
  },
  Hero: {
    fontSize: 42,
    color: primary,
    width: 170,
    fontFamily: 'OpenSans-Bold'
  },
  Hero2: {
    fontSize: 22,
    color: primary,
    fontFamily: 'OpenSans-Bold'
  },
  BigText: {
    fontFamily: 'OpenSans-Semibold'
  },
  Normal: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 13,
  },
})

export const getTransformedData = (translateX: number) => ({
  transform: [
    {
      translateX: animateProperty(translateX, true),
    }
  ]
})
