
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

const icons = {
  home, alert, book,
  words, cards, loading,
  notification, plus, saved,
  search, sort, trash,
  user, wifi,
  'notification-trash': notificationTrash,
  'sort-by-name': sortByName,
}

import React from 'react'

export default class IconRenderer extends React.Component<{
  width: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
}> {
  render() {
    const { primaryColor, icon, secondaryColor, width } = this.props
    
    return <SvgXml
      xml={icons[icon](width, primaryColor, secondaryColor)}
    
      width={width}
      height={width}
    />
  }
}
