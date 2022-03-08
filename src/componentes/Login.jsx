import React,{ useRef, useState } from 'react';
import '../css/login.css';
const URL_LOGIN = 'http://localhost:8080/React/login_project_react/login/login.php'

const enviarData = async (url,data)=>{

const resp = await  fetch (url,{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    console.log(resp);
    const json = await resp.json()
    console.log(json)

    return json;
}

export default function Login(props){

    const [error, setError]= useState(null);
    const [espera,setEspera]= useState(false);

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin= async()=>{

        setEspera(true);
        const data ={
            "usuario" : refUsuario.current.value,
            "clave" :refClave.current.value
        }

        //console.log(data);
        const respJson= await enviarData (URL_LOGIN,data);
        console.log(respJson.conectado);

        props.acceder(respJson.conectado)
        setError(respJson.error)
        setEspera(false);
        

        
    }

    return (
        <div className="login">
            <div className="row"> 
                <div className="col-sm-4 offset-4 mt-5 col-center ">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h3>Inicio de Sesión</h3>   
                        </div> 

                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                    @
                                    </span>
                                </div>
                                
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="correo"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref ={refUsuario}
                                />
                            </div>


                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                    🔒
                                    </span>
                                </div>
                                
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="clave"
                                    aria-label="clave"
                                    aria-describedby="basic-addon1"
                                    ref ={refClave}
                                />
                            </div>

                            {
                                error &&
                                <div className="alert alert-danger">
                                  {error}
                                </div>
                            }
                            
                            
                            
                            <button 
                            onClick = {handleLogin}
                            disabled={espera}
                            className='btn btn-info btn-lg rounded-pill btn-danger pe-4 ps-4' style={{ margin: 22 }}>
                               Iniciar Sesión   
                            </button>


                            <button className='btn btn-info btn-lg rounded-pill pe-4 ps-4' style={{ margin: 22 }}>
                               Registrarse  
                            </button>

                        </div>
                           
                    </div>     
                </div>    
            </div>
        </div>
    );
};