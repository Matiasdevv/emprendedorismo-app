import React, { useEffect, useState } from 'react'
import {useParams, Navigate, useNavigate} from 'react-router-dom'
import { useRef } from 'react'
import { peticiones } from '../models/http'
import { peticion } from './peticion'

export const Asistencias =  () => {

    const [state, setState] = useState('')
    const ref = useRef()
    let urlOption = useParams().nombre
    const navigate = useNavigate()
    useEffect(() => {

        peticion()

    }, [])


    const verAlumno = ()=>{
        navigate(`${ref.current.value}`)
    }


    const peticion = async ()=>{

        try{
            if(state === ''){
                return(
                    await fetch(peticiones['asistencias'])
                        .then(res=>res.json())
                        .then(res=>{
                            setState(res)
                        }))

            }
        }catch(e){
            console.log(e)
        }


    }


    const Select =
     <div className='container row mt-3'>
        <label htmlFor='select'>Selecciona un alumno para ver sus asistencias</label>
        <select id='select' ref={ref}>

        {state !== '' ? state.map(index=>{

            return(
                <option value={index.alumno}>{index.alumno}</option>
            )
        })
        :
        'Algo salió mal...'
        }

        </select>
        <button className='btn btn-dark' onClick={verAlumno}>Ver asistencias</button>
    </div>



 const AlumnoAsistencia =
            <table>
                 {state !== '' ?
                    <thead>

                        <th>Alumno</th>
                        <th>Fecha</th>
                        <th>Asistencia</th>
                        <th>Preceptor</th>
                        <th>Justificacion</th>


                    </thead>
                :
                  ''
                }
                <tbody>

                    {state !== '' ? state.map((index,i)=>{
                        if(urlOption === index.alumno)
                        return(

                            <tr key={i}>
                                <th>{index.alumno}</th>
                                <th>{index.dia}</th>
                                <th>{index.tipo}</th>
                                <th>{index.preceptor}</th>
                                <th>{index.justificacion}</th>
                            </tr>
                        )
                    })
                    :
                     'algo paso'
                    }



                </tbody>
            </table>

  return (
    <div className='container'>


    {urlOption === undefined ?
        Select
    :

        AlumnoAsistencia
    }


    </div>
  )
}
