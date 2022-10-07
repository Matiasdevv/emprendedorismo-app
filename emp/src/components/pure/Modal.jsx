
import React from 'react'

export const Modal = ({data}) => {
  return (
    <div className="modal fade" id="modalAlumno" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h5  className="modal-title" id="exampleModalLabel">Modificar alumno</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                {/* {  TODO: hacer formulario con formik y yup uwu } */}
                <label>{data.nombreAlumno}</label>
            </div>
            </div>
        </div>
  )
}


