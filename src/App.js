
import logo from './assets/imagenes/logo.png'
import Login from './componentes/Login'
import Menu from './componentes/Menu'
import React, { useState } from 'react';


function App() {

  const [conectado, setConectado]= useState(false);

  const acceder = (estado)=> {
    setConectado (estado)
  }

  return (
    conectado ? <Menu/> : <Login acceder={acceder}/>
    
  );
}

export default App;
