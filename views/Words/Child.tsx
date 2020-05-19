

import React, { forwardRef } from 'react'
import { View, Text } from 'react-native'
import { memoize } from '../../utils'

function Child({num}) {
  console.log(num)
  return (
    <View>
      <Text>
        {num}
      </Text>
    </View>
  )
}

export default React.memo(Child)
