import React, { useEffect } from 'react'
import {Form as Formu, Formik,  Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { peticiones } from '../models/http'
import { Navigate } from 'react-router-dom'


export const Form = ({state, setState, setAlumnosTable, AlumnosTable}) => {

    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    let requestUnit = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(state)
    }

    const handleSubmit = async (e)=>{
        await fetch(peticiones.postAlumno,requestUnit)
        .then(res=>alert(res))
        setAlumnosTable(...AlumnosTable, state)
    }

    const AlumnosSchema = Yup.object().shape({
        'dniAlumno': Yup
            .number()
            .required('Este campo es requerido'),
        'matricula': Yup
                    .number()
                    .required('Este campo es requerido'),
        'nombreAlumno': Yup.string()
                     .required('Este campo es requerido'),
        'direccion': Yup
                     .string()
                     .required('Este campo es requerido'),
        'email': Yup
                 .string()
                 .email()
                 .required('Este campo es requerido'),
        'curso_id': Yup.number()
                    .required('Este campo es requerido'),



    }
    )

    const initialCredentials = {

        dniAlumno:'',
        matricula: '',
        nombreAlumno: '',
        direccion: '',
        email: '',
        curso_id: ''
    }

  return (
    <Formik


        validationSchema={AlumnosSchema}
        onSubmit={(e)=>e.preventDefault()}
    >

    {({errors,isSubmitting,touched})=>{

        return(
            <Formu className='modal-body' onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <div className='mb-2'>
                        <label htmlFor='dni' className='form-label'>Dni</label>
                        <Field id='dni' name='dniAlumno' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.dniAlumno && (<ErrorMessage name='dniAlumno' component={'p'}/>)}
                     </div>
                    <div className='mb-2'>
                        <label htmlFor='matricula' className='form-label'>Matricula</label>
                        <Field id='matricula' name='matricula' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.matricula && (<ErrorMessage name='matricula' component={'p'}/>)}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='nombre' className='form-label'>Nombre</label>
                        <Field id='nombre' name='nombreAlumno' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.nombreAlumno && touched.nombreAlumno && (<ErrorMessage name='nombreAlumno' component={'p'}/>)}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='direccion' className='form-label'>Domicilio</label>
                        <Field id='direccion' name='direccion' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.direccion && touched.direccion && (<ErrorMessage name='direccion' component={'p'}/>)}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <Field id='email' type='email' name='email' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.email && touched.email && (<ErrorMessage name='email' component={'p'}/>)}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='curso' className='form-label'>Curso</label>
                        <Field id='curso' name='curso_id' className='form-control' onChange={(e)=>handleChange(e)}/>
                        {errors.curso_id && touched.curso_id && (<ErrorMessage name='curso_id' component={'p'}/>)}
                    </div>
            </div>


                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                    <button type="submit" className="btn btn-primary" >Añadir</button>
                </div>
            </Formu>
        )
    }
    }



    </Formik>
  )
}
