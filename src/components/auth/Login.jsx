import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../actions/index'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let user = useSelector(state => state.user)
    let navigate = useNavigate();
    if (user) {
        navigate(`/home/`);
    }

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const changeInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value
        }))
    }
    const validate = (input)=>{
        let errors = {};
        if (!input.email) {
             errors.email = 'El email es requerido';
        } else if (!/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i.test(input.email)) {
            errors.email = 'El email debe ser valido';
        }
        if (!input.password) {
            errors.password = 'Password es requerido';
        } else if (!/^([A-Za-z]|[0-9])+$/.test(input.password)) {
            errors.password = 'Contraseña debe ser valida';
        }
        return errors;
    }


    const handlerSubmit = (e) => {
        e.preventDefault()
        // no mandar si inputs estan vacios
        if (inputs.email.length === 0 || inputs.password.length === 0) {
            return setErrors(validate(inputs))
        }
        // mandar si inputs estan llenos
        if (Object.keys(errors).length === 0) {
            // limpiar form
            setInputs({
                email: '',
                password: ''
            })
            // mandar a login
            dispatch(login(inputs.email, inputs.password))
            // setear preloader
        }
    }   

  return (
    <Fragment>
        <div>
            
            {/* <div className={`wrapper-success ${actvidadAgregada.name && 'show'} `}>
                <div className="card">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <div className="subject">
                        <h3>Success</h3>
                        <p>Se agrego correctamente: {actvidadAgregada.name}</p>
                    </div>
                    <div className="icon-times"><i className="fas fa-times"></i></div>
                </div>
            </div> */}
            <form onSubmit={handlerSubmit} id="activitie-form">
                <div id="form-main-container" className="">
                    <h2>Iniciar sesion</h2>
                    
                    <hr />
                    <div id='form-area'>
                        <div id='activities' className="row">
                            
                            <div className='col-6'>
                                <fieldset className="form-group">
                                    <label className='form-label left-align' htmlFor="nombreActividad">
                                        E-mail: 
                                    </label>
                                    <input 
                                      onChange={(e)=>changeInput(e)}
                                      value={inputs.email}
                                      type="email" 
                                      name='email' 
                                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                      id="nombreActividad" 
                                      placeholder="Escribe tu E-mail..." 
                                      required />
                                    {errors.email && <span className='error'>{errors.email}</span>}
                                </fieldset>
                            </div>
                            <div className='col-6'>
                                <fieldset className="form-group">
                                    <label className='form-label left-align' htmlFor="nombreActividad">
                                        Contraseña: 
                                    </label>
                                    <input 
                                      onChange={(e)=>changeInput(e)}
                                      value={inputs.password}
                                      type="password" 
                                      name='password' 
                                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                      id="nombreActividad" 
                                      placeholder="Escribe tu Contraseña..." 
                                      required />
                                    {errors.password && <span className='error'>{errors.password}</span>}
                                </fieldset>
                            </div>
                            
                            <div className="center-text" id='activities-btn'>                                
                            {errors.email || errors.password 
                            ? <button type="submit" className="btn" disabled>Ingresar</button> 
                            : <button type="submit" className="btn">Ingresar</button>}
                            </div>

                        </div>
                    </div>
                
                </div>
                
            </form>
        </div>
        </Fragment>
  )
}

export default Login