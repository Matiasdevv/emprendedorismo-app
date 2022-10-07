const express = require('express')

const mysql = require('mysql')
const mycon = require('express-myconnection')
const routes = require('./routes')
const cors = require('cors')

const app = express()


let whitelist = ['http://localhost:3000']

app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'colegio_test'
}

// midlewars

app.use(mycon(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors({origin: whitelist})) // si los parentesis estan vacios abre el puerto a cualquier origen



//server routes
app.get('/',(req,res)=>{
    res.send('Welcome to my api uwu')
})
app.use('/api', routes)
app.use('/alumno', routes)
app.use('/alumno/asistencia', routes)
app.use('/asistencia', routes)
app.use('/personal', routes)
app.use('/curso', routes)
app.use('/divison', routes)
app.use('/tutor', routes)
app.use('/materia', routes)
app.use('/postAlumno', routes)
app.use('/notas', routes)
app.use('/eliminarCurso', routes)
app.use('/credenciales', routes)


//server running
app.listen(app.get('port'),()=>{
    console.log('server running on port ', app.get('port'))
})