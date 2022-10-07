import React, { useEffect, useRef, useState} from 'react'
import { peticiones } from '../models/http'
import { confirmAlert } from 'react-confirm-alert'; //! Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useParams, Navigate, useNavigate} from 'react-router-dom'
import {Loading} from '../components/pure/Loading'


export const Materias =  () => {

    const [state, setState] = useState('')
    const [materiaCurso, setmateriaCurso] = useState('')
    const ref = useRef()
    let urlOption = useParams().curso
    const navigate = useNavigate()


    useEffect(() => {

        peticion()
        if(urlOption !== undefined){
            peticionCurso()
        }

    }, [])


    const verAlumno = ()=>{
        navigate(`${ref.current.value}`)
    }


    const peticion = async ()=>{

        try{
            if(state === ''){
                return(
                    await fetch(peticiones['materiasCurso'])
                        .then(res=>res.json())
                        .then(res=>{
                            setState(res)
                        }))

            }
        }catch(e){
            console.log(e)
        }


    }


    const peticionCurso = async ()=>{

        try{
            if(state === ''){
                return(
                    await fetch(peticiones['materiasCurso'+ urlOption])
                        .then(res=>res.json())
                        .then(res=>{
                            setmateriaCurso(res)
                        }))

            }
        }catch(e){
            console.log(e)
        }


    }


    const colocarCambio = (e)=>{
      confirmAlert({
          title: '¿Confirmar cambios?',
          message: 'Confirma para cambiar los datos',
          buttons: [
            {
              label: 'Si',
              onClick: () => alert('a')
            },
            {
              label: 'No',
            }
          ]
        });

  }


    const Select =
     <div className='container row mt-3'>
        <label htmlFor='select'>Selecciona un curso para ver sus materias</label>
        <select id='select' ref={ref}>

        {state !== '' ? state.map((index,i)=>{

            return(
                <option value={index.Curso} key={i}>{index.Curso}</option>
            )
        })
        :
        'Algo salió mal...'
        }

        </select>
        <button className='btn btn-dark' onClick={verAlumno}>Ver materias de curso</button>
    </div>



 const materiasCurso =
            <table className='table'>
                 {materiaCurso !== '' ?
                    <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Turno</th>
                        <th>Orientacion</th>
                        <th>Profesor</th>
                        <th>Situacion de revista</th>
                    </tr>
                    </thead>
                :
                  ''
                }
                <tbody>

                    {materiaCurso !== '' ? materiaCurso.map((index,i)=>{
                        if(urlOption === index.alumno)
                        return(

                            <tr key={i}>
                                <th>{index.Materia}</th>
                                <th>{index.Turno}</th>
                                <th>{index.Curso}</th>
                                <th>{index.Orientacion}</th>
                                <th>{index.Profesor}</th>
                                <th>{index.SitRevista}</th>
                            </tr>
                        )
                    })
                    :
                     <Loading/>
                    }



                </tbody>
            </table>

  return (
    <div className='container'>


        {urlOption ?
            Select
        :
            materiasCurso
        }


    </div>
  )
}


