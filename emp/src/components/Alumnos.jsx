import React, { useEffect, useRef, useState } from 'react'
import { peticiones } from '../models/http'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Form } from '../form/Form';
import { Modal } from './pure/Modal';
import { Loading } from './pure/Loading';

export const Alumnos = () => {

    const [alumnos, setAlumnos] = useState('')

    const [alumnoState, setalumnoState] = useState(false)

    const [Alumno, setAlumno] = useState({
      'dniAlumno':0,
      'nombreAlumno': '',
      'matricula': 0,
      'curso_id': 0,
      'direccion': '',
      'email': ''

    })


    useEffect(() => {

        peticion()

    },[alumnoState])






    const deleteRow = async (id)=>{


       let requestUnit = {
          method: 'DELETE',
      }

          await fetch(peticiones.eliminarAlumno + id,requestUnit)
          .then(res=>res.text())
          .then(res=>console.log(res))
          setalumnoState(!alumnoState)
    }


    const colocarCambio = (id)=>{
        confirmAlert({
            title: '¿Confirmar cambios?',
            message: 'Confirma realizar cambios',
            buttons: [
              {
                label: 'Si',
                 onClick: () => deleteRow(id)
              },
              {
                label: 'No',
              }
            ]
          });

    }


    const peticion = async ()=>{

        try{
                return(
                    await fetch(peticiones['alumnos'])
                          .then(res=>res.json())
                          .then(res=>{
                            setAlumnos(res)
                        }))

        }catch(e){
            console.log(e)
        }


    }

    let modal =

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
            <h5  className="modal-title" id="exampleModalLabel">Añadir alumno</h5>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          {/* {  TODO: hacer formulario con formik y yup uwu } */}
          <Form state={Alumno} setState={setAlumno} setAlumnosTable={setAlumnos} AlumnosTable={Alumnos}/>

      </div>
    </div>
  </div>

    //? Funciones para  los Modales (en este caso se sacaron las funciones pero una queda para pasar los datos del alumno)

    const showModal = (data)=>{
      return <Modal data={data}/>
    }

  return (

    <div className='container'>
        <div className='row'>

            <div className='row modal-footer'>
                {modal}
                <button className='btn btn-dark mt-2 ' data-bs-toggle="modal" data-bs-target="#exampleModal">Añadir Alumno</button>
            </div>

            <div className='container'>

                <table className='table'>
                    <thead>
                      <tr>
                          <th scope='col'>Dni</th>
                          <th scope='col'>Nombre</th>
                          <th scope='col'>Direccion</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                     {alumnos !== '' ?  (alumnos.map((index,i)=>{

                    return(
                        <tr key={i} >
                            <th>{index.dniAlumno}</th>
                            <td>{index.nombreAlumno}</td>
                            <td> {index.direccion}</td>
                            <td></td>
                            <td>
                              <div className='mb-3'>
                                <button onClick={()=>showModal(index)} data-bs-toggle="modal" data-bs-target="#modalAlumno" className='btn btn-dark'>Editar</button>
                                <button onClick={()=>colocarCambio(index.dniAlumno)} className='btn btn-danger' name='btnInfo'>Eliminar</button>
                              </div>
                            </td>
                        </tr>
                    )

                    }))
                    :
                      <div>
                        <Loading/>
                      </div>
                    }
                </tbody>
            </table>



        </div>
    </div>

</div>

  )
}
