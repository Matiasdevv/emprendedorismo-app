import React, { useEffect, useState } from 'react'
import { peticiones } from '../models/http'
import { Loading } from './pure/Loading'

export const Personal = () => {

 const [personal, setPersonal] = useState('')


useEffect(() => {
  peticion()


}, [])



 const peticion = async ()=>{

    try{
                await fetch(peticiones['personal'])
                    .then(res=>res.json())
                    .then(res=>{
                        setPersonal(res)

                    })

    }catch(e){
        console.log(e)
    }


}

  return (
    <div>
        {
                 personal !== '' ?
        <table className='table ms-5'>
            <thead>
                <th>Dni</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Cargo</th>
                <th>Titulado en:</th>
            </thead>
            <tbody>


                {personal.map((p,i)=>{
                return(
                    <tr key={i}>
                        <th>{p.dni}</th>
                        <td>{p.nombre}</td>
                        <td>{p.direccion}</td>
                        <td>{p.telefono}</td>
                        <td>{p.cargo}</td>
                        <td>{p.titulo}</td>
                        <td>
                            <div>
                                <button className='btn btn-dark'>Editar</button>
                                <button className='btn btn-danger'>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                )
             })}



            </tbody>


        </table>


:
             <table><Loading/></table>

            }


       </div>
  )
}
