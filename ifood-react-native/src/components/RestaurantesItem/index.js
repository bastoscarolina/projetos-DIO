import {  Text } from 'react-native'
import React from 'react'
import {RestauranteView,RestauranteFoto,RestauranteInfo} from './style'
import {AntDesign} from '@expo/vector-icons'

const RestaurantesItem = ({foto, nome, key, nota, categoria, distancia, valorFrete, tempoEntrega}) => {
  return (
    <RestauranteView key={key}>
        <RestauranteFoto
            source={{
                uri:foto.trim(),
                width:50,
                height:50,
                resizeMode: 'cover'
    }}/>
        <RestauranteInfo>
            <Text>{nome}</Text>
            <Text>
                <AntDesign name="star" size={12} color="#F9A825" /> 
                {nota} - {categoria} - {distancia}
            </Text>
            <Text>
                {tempoEntrega} • R${valorFrete}
            </Text>
            <Text></Text>
        </RestauranteInfo>

    </RestauranteView>
  )
}

export default RestaurantesItem

