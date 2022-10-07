import React, { useEffect, useState } from 'react'
import { peticiones } from '../models/http'
import { confirmAlert } from 'react-confirm-alert'; //! Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Loading } from './pure/Loading';


export const Cursos = () => {

  const [state, setState] = useState('')
  const [deleteState, setDeleteState] = useState(false)
  const [preceptores, setPreceptores] = useState('')
  const [cursoPreceptor, setCursoPreceptor] = useState()


  useEffect(() => {

      peticionCurso()
      peticion()

  }, [])

  const handleChange = (e)=>{
    setCursoPreceptor(
       {[e.taget.name]: e.target.value}
    )
    console.log(e)
  }

  const deleteRow = async (id)=>{

    let requestUnit = {
        method: 'DELETE',
    }

        await fetch(peticiones.eliminarCurso + id,requestUnit)
        .then(res=>res.text())
        .then(res=>console.log(res))
        setDeleteState(!deleteState)
  }

  const verificarCambios = (e)=>{

      colocarCambio(e)
  }

  const colocarCambio = (id)=>{
    confirmAlert({
        title: '¿Confirmar cambios?',
        message: 'Confirma para cambiar los datos',
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

  const peticionCurso = async ()=>{

      try{
          if(state === ''){
              return(
                  await fetch(peticiones['cursos'])
                      .then(res=>res.json())
                      .then(res=>{
                          setState(res)
                      }))

          }
      }catch(e){
          console.log(e)
      }


  }


  const peticion = async ()=>{

    try{
        if(state === ''){
            return(
                await fetch(peticiones['preceptores'])
                    .then(res=>res.json())
                    .then(res=>{
                        setPreceptores(res)
                    }))

        }
    }catch(e){
        console.log(e)
    }


}


  return (
    <div className='col mb-1'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Curso</th>
                    <th>Division</th>
                    <th>Orientacion</th>
                    <th>Turno</th>
                    <th>Preceptor</th>
                    <th>Materias</th>
                </tr>
            </thead>
            <tbody>
                {state !== '' ?  state.map((index,i)=>{

                return(

                    <tr key={i} >
                            <th>{index.Curso}</th>
                            <td>{index.Division}</td>
                            <td>{index.Orientacion}</td>
                            <td>{index.Turno}</td>
                            <td>
                                <select defaultChecked className='form-select me-0' name='select-profesor' onChange={(e)=> handleChange(e)}>

                               {

                                preceptores !== '' ?

                                preceptores.map((p,n)=>{
                                    return(
                                        <option key={n}>
                                            {p.nombre}
                                        </option>
                                    )
                                })
                                :
                                <option>No asignado</option>
                               }

                                </select>

                            </td>
                            <td style={{cursor:'pointer'}}>Click Aqui</td>
                            <td>
                                <div className='mb-3'>
                                    <button className='btn btn-dark'>Guardar</button>
                                    <button onClick={()=>colocarCambio(index.registroCurso)} className='btn btn-danger'>Eliminar</button>

                                </div>
                            </td>
                        </tr>
                )

                 })
                 :
                    <Loading/>
                 }
            </tbody>
        </table>



    </div>
  )
}
