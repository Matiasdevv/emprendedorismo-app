const express = require('express')
const routes = express.Router()


let asisQuery = `
select asis.dia, asis.preceptorId as 'preceptor', asis.tipo, a.nombreAlumno as 'alumno', asis.justify as 'justificacion' from
asistencia asis
join alumno a on alumno_dni = a.dniAlumno;`

let sqlquery = `select count(
    Case when asi.tipo=1 then 'Asistencia'
         when asi.tipo=2 then 'Tardanza'
         when asi.tipo=3 then 'Inasistencia' end
    ) as 'Asistencias', a.nombreAlumno
    from
        asistencia asi
        join alumno a
        on a.dniAlumno = asi.alumno_dni
        where (asi.tipo = 1)
     ;`


let materiasQuery = `select
m.nombre as 'Materia',
m.turno as 'Turno',
m.idCurso as 'Curso',
o.nombre as 'Orientacion',
(select nombre from sitRevista where sitRevista.id = m.sitRevistaId) as 'SitRevista',
     CASE p.cargo
  WHEN 'profesor' then p.nombre
  else 'Sin profesor asignado'
  end
  as 'Profesor'
from materia m

  inner join orientacion o

  on(o.id = m.orientacion)

  inner join personal p
  on(p.dni = m.dni_profesor)

`


let cursosQuery = `select c.idCurso as 'Curso', c.division as 'Division', t.nombre as 'Turno',p.nombre as 'Preceptor', o.nombre as 'Orientacion'
from curso c
join turno t on c.idTurno = t.idTurno
join personal p on c.preceptorId = p.dni
join orientacion o on c.orientacionId = o.id
;`

let alumnosPutQuery = ``



let notasQuery = `
select n.idRegistro as'registro', m.nombre as 'materia', a.nombreAlumno as 'alumno', p.nombre as 'profesor', n.idCuatrimestre as 'cuatrimestre'

from notas n
join alumno a on n.dniAlumno = a.dniAlumno
join personal p on n.dniProfesor = p.dni
join materia m on n.idMateria = m.id
where n.dniAlumno = ?
;`


     ///Get

routes.get('/alumno/:id', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{

            conn.query('SELECT * FROM alumno where nombreAlumno = ? ',[req.params.id],
             (err,rows)=>{
                if(err) return err
                res.json(rows)
            })

        }catch(err){

            console.log(err)

        }

    })
})


routes.get('/alumno', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{

            conn.query('SELECT * FROM alumno ',
             (err,rows)=>{
                if(err) return err
                res.json(rows)
            })

        }catch(err){

            console.log(err)

        }

    })
})


routes.get('/materia/:id', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{

            conn.query('SELECT * FROM materias where materia = ? ',[req.params.id],
             (err,rows)=>{
                if(err) return err
                res.json(rows)
            })

        }catch(err){

            console.log(err)

        }

    })
})


routes.get('/curso', (req, res)=>{
    req.getConnection((err,conn)=>{
        try{

            conn.query(cursosQuery,
             (error,rows)=>{
                if(error) return res.send(error)

                res.send(rows)
            })

        }catch(e){

            res.send(e)

        }

    })
})




routes.get('/credenciales', (req, res)=>{
    req.getConnection((err,conn)=>{
        try{

            conn.query('select * from usuario',
             (error,rows)=>{
                if(error) return res.send(error)

                res.send(rows)
            })

        }catch(e){

            res.send(e)

        }

    })
})


routes.get('/alumno',(req,res)=>{

    res.send('Homepage')
})

routes.get('/alumno/asistencia',(req,res)=>{
    req.getConnection((err,conn)=>{
        console.log(req)
    try{
          conn.query('select nombreAlumno from alumno;',
            (error,rows)=>{
             if(error) return console.log('algo paso', error)
               res.json(rows)
             })
     }catch(e){

        res.send('Smthng went wrong', err)

     }

})
})


routes.get('/asistencia', (req, res)=>{
    req.getConnection((err,conn)=>{
            console.log(req)
        try{



              conn.query(asisQuery,
                (error,rows)=>{
                 if(error) return console.log(error)
                   res.json(rows)
                 })
         }catch(e){

            res.send('Smthng went wrong', err)

         }

    })
 })




 routes.get('/personal', (req, res)=>{
    req.getConnection((err,conn)=>{
        try{
              conn.query('SELECT * FROM personal',
                (error,rows)=>{
                 if(error) return console.log(error)
                   res.json(rows)
                 })
         }catch(e){

            res.send('Smthng went wrong', err)

         }

    })
 })



 routes.get('/personal/:req', (req, res)=>{
    req.getConnection((err,conn)=>{
        try{
              conn.query('SELECT * FROM personal where cargo = ?',[req.params.req],
                (error,rows)=>{
                 if(error) return console.log(error)
                   res.json(rows)
                 })
         }catch(e){

            res.send('Smthng went wrong', err)

         }

    })
 })



 routes.get('/materia',(req,res)=>{
    req.getConnection((err,conn)=>{
        try{
            conn.query(materiasQuery,
                (error,rows)=>{
                 if(error) return console.log(error)
                   res.json(rows)
                 })
        }catch(e){
            res.send(e)
        }

    })
 })


 routes.get('/materias/:m',(req,res)=>{
    req.getConnection((err,conn)=>{
        try{
            conn.query(`${materiasQuery} where m.idCurso = ? ;`,[req.params.m],
                (error,rows)=>{
                 if(error) return console.log(error)
                   res.json(rows)
                 })
        }catch(e){
            res.send(e)
        }

    })
 })


 routes.get('/notas/:alumno', (req,res)=>{
    req.getConnection((err,conn)=>{
        try{
            conn.query(notasQuery,[req.params.alumno], (error,rows)=>{
                if( error) return res.send('algo a salido mal', error)
                if(rows == undefined) return res.send('Informacion no disponible')

                return res.send(rows)
            })
        }catch(e){
            return('algo salió mal', e)
        }
    })
})



 //?post

routes.post('/postAlumno', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{
            console.log(req.body)
            conn.query('INSERT into alumno set ? ', [req.body],
             (error,rows)=>{
                if(error) return console.log(error)

                res.send('Bro has registered')

            })

        }catch(e){

            res.send('bro',err)

        }

    })
})




//* Update

routes.put('/alumnos-put', (req,res)=>{

    req.getConnection((err,conn)=>{
        try{
            conn.query(alumnosPutQuery, (error,success)=>{
                if(error) throw error
                res('pusido bien')
            })
        }catch(e){
                console.log(e)
        }
    })

})


///!Delete
routes.delete('/:id', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{
            conn.query('DELETE from alumno WHERE dniAlumno = ? ', [req.params.id],
             (error)=>{
                if(err || req.body == {}){
                    res.send('Algo ha salido mal')}

                else{
                    res.send('Cambios realizados')
                }
            })

        }catch(e){

            res.send(err)

        }

    })
})



routes.delete('/eliminarCurso/:id', (req, res)=>{
    req.getConnection((err,conn)=>{

        try{
            conn.query('DELETE from curso WHERE registroCurso = ? ', [req.params.id],
             (error)=>{
                if(err || req.body == {}){
                    res.send('Algo ha salido mal')}

                else{
                    res.send('Cambios realizados')
                }
            })

        }catch(e){

            res.send(err)

        }

    })
})


module.exports = routes