import React from 'react'
import {useParams} from 'react-router-dom'
export const NotFound = () => {

  let referencia = useParams()
  console.log(referencia)
  return (
    <div>404</div>
  )
}
