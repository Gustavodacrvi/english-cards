
import {
  SvgXml,
} from 'react-native-svg'

import home from './Icons/home'

const icons = {
  home,
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
