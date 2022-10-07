import { peticiones } from "../models/http"

export const peticion = async ({data})=>{

    try{
                await fetch(peticiones[`${data}`])
                    .then(res=>res.json())
                    .then(res=>{
                        return(
                            res
                        )

                    })

    }catch(e){
        console.log(e)
    }


}
