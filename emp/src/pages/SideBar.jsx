import React, { useEffect, useState } from 'react'
import '../styles/sideBar.css'
import {BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate} from 'react-router-dom'
import { Homepage } from '../components/Homepage'
import { Materias } from './Materias'
import { NotFound } from './404/NotFound'
import { Alumnos } from '../components/Alumnos'
import { Cursos } from '../components/Cursos'
import { peticiones } from '../models/http'
import { Asistencias } from '../components/Asistencias'
import { Notas } from '../components/Notas'
import { LoginForm } from '../form/LoginForm'
import { Personal } from '../components/Personal'

export const SideBar = () => {

    const [checked, setchecked] = useState({width:'10rem'})

    const check = (e)=>{
        if(e.target.checked){

            setchecked({width:'10rem'})

        }else{

            setchecked({width:'4rem'})

        }
    }


  return (
    <Router>
        <div id="sideBar" style={checked}>

            <div id="sideBar__menu" className="close" >
                <input type="checkbox" id="check" onClick={(e)=>check(e)}/>
                <label htmlFor="check">
                    owo
                </label>
            </div>

            <ul id="sideBar__content">

                        <li><Link to={'/alumnos'}><i className="fa-solid fa-user-graduate icon"></i><span>Alumnos</span></Link></li>
                        <li><Link to={'/materias'}><i className="fa-solid fa-file-signature"></i><span>Materias</span></Link></li>
                        <li><Link to={'/cursos'}><i className="fa-solid fa-arrow-down-1-9"></i><span>Cursos</span></Link></li>
                        <li><Link to={'/notas'}><i className="fa-solid fa-calendar-days"></i><span>Notas</span></Link></li>
                        <li><Link to={'/personal'}><i className="fa-solid fa-users"></i><span>Personal</span></Link></li>
                        <li><Link to={'/asistencias'}><i className="fa-solid fa-users"></i><span>Asistencias</span></Link></li>
            </ul>
        </div>

        <Routes>
              <Route>
                  <Route path='/' element={<Homepage/>}/>
                  <Route path='/login' element={<LoginForm/>}/>
                  <Route path='/materias' element={<Materias prop={'materia'}/>}/>
                  <Route path='/materias/:id' element={<Materias prop={'materia'}/>}/>
                  <Route path='/alumnos' element={<Alumnos/>}/>
                  <Route path='/cursos' element={<Cursos/>}/>
                  <Route path='/asistencias' element={<Asistencias/>}/>
                  <Route path='/asistencias/:curso' element={<Asistencias/>}/>
                  <Route path='/notas' element={<Notas/>}/>
                  <Route path='/notas/:nota' element={<Notas/>}/>
                  <Route path='/personal' element={<Personal/>}/>
                  <Route path='/personal/:id' element={<Personal/>}/>
                  <Route path='*' element={<NotFound/>} />
              </Route>
          </Routes>
    </Router>

  )
}
