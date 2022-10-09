import React, { useEffect, useState } from 'react'
import {Formik, Form, Field } from 'formik'
import  * as yup from 'yup'
import { peticiones } from "../models/http"
import { peticion } from '../components/peticion'
import { Navigate } from 'react-router-dom'

export const LoginForm = () => {

  const [credentials, setCredentials] = useState('')


  const loginPeticion = async()=>{
    try{
        await fetch(peticiones['credenciales'], {
          method: "POST",
          body: credentials
        })
        .then(res=>res.json())
        .then(res=>setCredentials(res))

    }catch(e){
      console.log(e)
    }
  }


  useEffect(() => {

  }, [])

  let chema = yup.object().shape(
    {usuario: yup.string().min(2,'Usuario invalido').required('Campo obligatorio'),
    password: yup.string().lowercase().required('Campo obligatorio')}
  )

  let initialCredentials = {
    usuario: '',
    password: ''
  }


  const handleCredentials = (e)=>{
    setCredentials({
      ...credentials,

      [e.target.name]: e.target.value

    })
  }


    const verificarLogin = (e)=>{

      loginPeticion()

    }




  return (
    <Formik
      validationSchema={chema}
      initialValues={initialCredentials}
      onSubmit={(e)=>verificarLogin()}
    >
        <Form className='p-3 h-50 w-25 mx-auto mt-5 shadow-sm p-3 mb-5 bg-body rounded'>
          <div className='mb-3'>
            <label>Usuario</label>
            <Field type={'text'} id='usuario' name='usuario' className='form-control' placeholder='Ingresa usuario'/>
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Contraseña</label>
            <Field type={'password'} id='password' name='password' onChange={(e)=>handleCredentials(e)} className='form-control' placeholder='Ingresa contraseña'/>
          </div>
          <div className='mb-3'>
              <Field type={'submit'} name='btn-submit' className='btn btn-dark' value='Iniciar sesion'/>
          </div>

        </Form>
    </Formik>
  )
}
