import React, { useEffect, useRef, useState } from 'react'
import {useParams, useNavigate, Navigate, } from 'react-router-dom'
import { peticiones } from '../models/http'
import { Loading } from './pure/Loading'

export const Notas = () => {
    const [alumno, setalumno] = useState('')
    const [notas, setNotas] = useState('')
    const urlNota = useParams().nota
    const alumnoNota = useRef('')
    const navigate = useNavigate()

    useEffect(() => {
            peticion()
            peticionNotas()

    }, [urlNota])


    const peticion = async ()=>{

        try{
            if(alumno === '' ){
                return(
                    await fetch(peticiones['alumnos'])
                          .then(res=>res.json())
                          .then(res=>{
                            setalumno(res)
                        }))


            }
        }catch(e){
            console.log(e)
        }


    }


    const peticionNotas = async ()=>{

        try{
            if(notas === '' && urlNota !== undefined){
                return(
                    await fetch(`http://localhost:9000/api/notas/${urlNota}`)
                          .then(res=>res.json())
                          .then(res=>{
                            setNotas(res)
                        }))


            }
        }catch(e){
            console.log(e)
        }


    }


    const AlumnoNota = ()=>{
        navigate(`${alumnoNota.current.value}`)
    }



  return (
    <div className='col mb-2'>
            {urlNota !== undefined ?
                <table className='table'>

                    <thead>
                        <th>Materia</th>
                        <th>Alumno</th>
                        <th>Nota</th>
                    </thead>
                    <tbody>

                        {notas !== '' ? notas.map(nota=>{
                            return(
                                <tr key={nota.registro}>
                                    <td>{nota.alumno}</td>
                                    <td>{nota.materia}</td>
                                    <td>{nota.cuatrimestre}</td>
                                    <td>
                                        <div className='mb-3'>
                                            <button className='btn btn-dark'>Guardar</button>
                                            <button className='btn btn-danger'>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>


                            )
                        })
                        : 'Este alumno no tiene materias'
                        }

                    </tbody>
                </table>
            :

            <div className='container mb-3 mt-5 w-50 shadow p-3 rounded'>
                <label htmlFor='selection'>Selecciona un curso para ver sus notas</label>
                <div className='d-flex'>

                    <select id='selection' className='form-select' ref={alumnoNota}>
                        {alumno !== '' ? alumno.map(((alum,index)=>{
                            return(
                                <option value={alum.dniAlumno} key={index}>curso</option>
                            )
                        })) 
                        :
                            <Loading/>
                        }
                    </select>

                    <select id='selection' className='form-select' ref={alumnoNota}>
                    {alumno !== '' ? alumno.map(((alum,index)=>{
                        return(
                            <option value={alum.dniAlumno} key={index}> DIvision</option>
                        )
                    })) 
                    :
                        <Loading/>
                    }
                </select>

                {/* Colocar la orientacion dinamica para que dependiendo el numero seleccionado se muestre o no
                    que se puedan ver pero no modificar dependiendo de un periodo de tiempo
                */}

                <select id='selection' className='form-select' ref={alumnoNota}>
                    {alumno !== '' ? alumno.map(((alum,index)=>{
                        return(
                            <option value={alum.dniAlumno} key={index}>orientacion</option>
                        )
                    })) 
                    :
                        <Loading/>
                    }
                </select>
                </div>
                <button className='btn btn-dark' onClick={AlumnoNota} disabled={true}>Ver planilla</button>
            </div>
            }




    </div>
  )
}
