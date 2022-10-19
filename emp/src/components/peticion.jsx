import { createContext } from "react"
import { peticiones } from "../models/http"

 export const peticion = async (data)=>{

   /**
    *  ? Esta funcion toma como parametro un valor asignado a una url
    * @Params data Según los dato que quiera obtener
    * @Returns una promesa que contiene un objeto con todos los datos correspondientes
    * Todo: modificar funcion, ya sea usando useContext o Promise.resolve, esto será una mejora importante en el codigo
    **/

    try{
            return(
                 await fetch(peticiones[`${data}`])
                   .then(resp=>resp.json())
                   .then(resp=>{return resp})
            )

        }catch(e){

            return(e)

        }








}
