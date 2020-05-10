
import {
  SvgXml,
} from 'react-native-svg'

import home from './Icons/home'
import alert from './Icons/alert'
import book from './Icons/book'
import words from './Icons/words'
import cards from './Icons/cards'
import loading from './Icons/loading'
import notificationTrash from './Icons/notification-trash'
import sortByName from './Icons/sort-by-name'
import notification from './Icons/notification'
import plus from './Icons/plus'
import saved from './Icons/saved'
import search from './Icons/search'
import sort from './Icons/sort'
import trash from './Icons/trash'
import user from './Icons/user'
import wifi from './Icons/wifi'
import arrow from './Icons/arrow'

import { Animated, View } from 'react-native'

const icons = {
  home, alert, book,
  words, cards, loading,
  notification, plus, saved,
  search, sort, trash,
  user, wifi, arrow,
  'notification-dash': notificationTrash,
  'sort-by-name': sortByName,
}

import React, { forwardRef } from 'react'

import { animateRotation } from '../../animations'

interface Props {
  width: string;
  icon: string;
  rotate: boolean;
  primaryColor: string;
  secondaryColor: string;
}


const IconRenderer = forwardRef(({
  primaryColor, icon, secondaryColor, width, rotate
}: Props, ref: any) => {
    
  return (
    <Animated.View
      style={{
        transform: [{rotate: rotate ? animateRotation() : '0deg'}],
      }}
    >
      <SvgXml
        xml={icons[icon](width, primaryColor, secondaryColor)}
      
        width={width}
        height={width}
      />
    </Animated.View>
  )
})

export default React.memo(IconRenderer)
