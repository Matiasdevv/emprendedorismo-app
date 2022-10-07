import { Fragment, useEffect} from 'react'
import { Homepage } from './components/Homepage';
import { SideBar } from './pages/SideBar';
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom'
function App() {

  // COsas a arreglar / implementar: 
  //Apartados, jerarquia, planillas(modelo), crear tabla de division de cursos, sidebar dinamiko, apartado de orientacion en sidebar


  return (
    <Fragment>

      <div className='d-flex'>

        <SideBar/> 
          

      </div>
    </Fragment>
  );
}

export default App;
