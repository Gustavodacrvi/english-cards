

import React, { useContext } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'

import Input from './Input'
import Icon from '../../../components/Icon'
import { primary } from '../../../styles/colors'
import { PopupContext } from '../../../contexts/popup'
import OptionsPopup from './OptionsPopup'

interface Props {
  setSearch: (search: string) => void;
  setSort: (sort: 'alphabetical' | 'creation' | 'reviews') => void;
  sort: string;
}

function SearchBar({setSearch, setSort, sort}: Props) {

  const {pushPopup} = useContext(PopupContext)
  
  return (
    <View
      style={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Input setSearch={setSearch}/>
      <View
        style={{
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primary, false)}
          useForeground={true}
          onPress={() => {
            pushPopup(() => <OptionsPopup
              sort={sort}
              setSort={setSort}
              close={() => pushPopup(null)}
            />)
          }}
        >
          <View
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 8,
              paddingLeft: 8,
            }}
          >
            <Icon
              icon='sort'
              width={25}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default React.memo(SearchBar)
