import { Fragment, useEffect, useState} from 'react'
import { Homepage } from './components/Homepage';
import { SideBar } from './pages/SideBar';
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom'
import { LoginForm } from './form/LoginForm';
function App() {

  // COsas a arreglar / implementar:
  //Apartados, jerarquia, planillas(modelo), crear tabla de division de cursos, sidebar dinamiko, apartado de orientacion en sidebar

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    setLogged(localStorage.getItem('logged'))

  }, [])


  return (
    <Fragment>

            <div className='d-flex'>

        { logged ? <SideBar/> : <LoginForm/>}


      </div>



    </Fragment>
  );
}

export default App;
