import React, { useEffect, useState } from 'react'
import { Table } from './Alumnos'

import {Navigate, useParams, useNavigate} from 'react-router-dom'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import { Materias } from '../pages/Materias'

export const Homepage = () => {


  const navigar = useNavigate()

  useEffect(() => {

    let data = localStorage.getItem('logged')
    if(data == null){
      navigar('/login')
    }
  }, [])

  return (
    <div>

      <img src='icon.png'/>

    </div>
  )
}
