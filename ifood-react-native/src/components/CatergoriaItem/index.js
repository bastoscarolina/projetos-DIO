import React from 'react'
import {CategoriaFoto,CategoriaTexto,CategoriaView} from './style'

const CategoriaItem = ({foto, texto, key}) => {
  return (
    <CategoriaView key={key}>
        <CategoriaFoto
            source={{
                uri:foto.trim(),
                width:98,
                height:58
            }}/>
        <CategoriaTexto>
            {texto}
        </CategoriaTexto>
    </CategoriaView>
  )
}

export default CategoriaItem