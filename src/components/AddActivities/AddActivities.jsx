import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './addactivities.css'
import { addActivities, cleanActivity } from './../../actions/index';

const AddActivities = () => {

    const isMounted = useRef(true);
    let countries = useSelector(state => state.countries) //? estado countries redux
    let actvidadAgregada = useSelector(state => state.activity) //? estado actvidadAgregada redux
    const dispatch = useDispatch() //? dispatch para ejecutar las acciones
    useEffect(() => {    
        return () => {     
            if(Object.keys(actvidadAgregada).length > 0){
                dispatch(cleanActivity()) //? si lo limpio porque al volver estara la alerta
                isMounted.current = false
            }   
        }
    },[actvidadAgregada, dispatch])
    
    const [search, setSearch] = useState({ //? state para buscar paises
        post: [],
        status: false,
        error: '',
    })
    const [agregado, setAgregado] = useState([]) //? paises agregados
    //? formulario
    const [activities, setActivities] = useState({ //? resto del formulario
        name: '',
        duracion: '',
        dificultad: '',
        temporada: '',
    }) 
    const [ errors, setErrors ] = useState({}) //? errores del formulario

    const changeInput = (e) => {
        setActivities({
            ...activities,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...activities,
            [e.target.name]: e.target.value
        }))
    }
    const validate = (input)=>{
        let errors = {};
        if (!input.name) {
          errors.name = 'El nombre es requerido';
        } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
          errors.name = 'El nombre debe contener solo letras';
        }
        if (!input.duracion) {
          errors.duracion = 'Duración es requerida';
        } else if (!/^[1-9]+[0-9]*$/.test(input.duracion)) {
          errors.duracion = 'La duración debe ser un número y debe ser positivo';
        }
        if (!input.dificultad) {
            errors.dificultad = 'Dificultad es requerida';
        } else if (!/^[1-9]+[0-9]*$/.test(input.dificultad)) {
            errors.dificultad = 'La dificultad debe ser un número y debe ser positivo';
        }
        if (!input.temporada) {
            errors.temporada = 'Temporada es requerida';
        }
        return errors;
    }

    const handlerSubmit = (e) => {
        //? evitar que se envie el formulario si agregado y actividades esta vacio
        if (agregado.length === 0) {
            e.preventDefault()
            setErrors({ ...errors, agregado: 'Debe agregar un país' })          
        }
        else{
            e.preventDefault()
            dispatch(addActivities(activities, agregado))
            handleClose()
            // si accion se ejecuto correctamente se limpia el formulario
            setActivities({
                name: '',
                duracion: '',
                dificultad: '',
                temporada: '',
            })
            setAgregado([])
            setSearch({})
            setErrors({})
            document.getElementById("activitie-form").reset();
            //redirigir a la pagina principal con router dom
        }
    }

    //# paises agregados
    const handleChange = async(e)=>{
        const filtered = await countries.filter((element)=> ((element.name.common).toLowerCase()).indexOf((e.target.value).toLowerCase()) !== -1)
        filtered.length === 0 
        ? setSearch({...search, post: [], error: `No se encontro coincidencia para: ${e.target.value}`}) 
        : setSearch({...search, post: filtered, error: ''})
    }
    const handleClickRemove = (e, element)=>{ //? deshabilita el pais y se agrega a la lista de paises agregados
        e.preventDefault()
        e.target.disabled = true
        setErrors({ ...errors, agregado: '' })
        return setAgregado([...agregado, element])
    }
    const handleClickRemoveToAgregado = (e, element)=>{ //? habilita el pais y se quita de la lista de paises agregados
        e.preventDefault()
        return setAgregado(agregado.filter((elem)=>elem.id_country !== element.id_country))
    }
    const handleClose = ()=>{
        setTimeout(()=>{
            if(isMounted.current){    
                document.querySelector('.wrapper-success').classList.remove('show')
            }
        }, 3000)
    }


    return (
        <Fragment>
        <div>
            {/* show */}
            <div className={`wrapper-success ${actvidadAgregada.name && 'show'} `}>
                <div className="card">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <div className="subject">
                        <h3>Success</h3>
                        <p>Se agrego correctamente: {actvidadAgregada.name}</p>
                    </div>
                    <div onClick={()=>document.querySelector('.wrapper-success').classList.remove('show')} 
                        className="icon-times">
                            <i className="fas fa-times"></i>
                    </div>
                </div>
            </div>

            <form onSubmit={handlerSubmit} id="activitie-form">
                <div id="form-main-container" className="">
                    <h2>Agregar Actividad</h2>
                    
                    <hr />
                    <div id='form-area'>
                        <div id='activities' className="row">
                            <div className='col-6'>
                                <fieldset className="form-group">
                                    <label className='form-label left-align' htmlFor="nombreActividad">
                                        Nombre de Actividad: 
                                    </label>
                                    <input onChange={(e)=>changeInput(e)} type="text" name='name' className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="nombreActividad" value={activities.name} required placeholder="Escribe tu actividad..." />
                                    {errors.name && <span className='error'>{errors.name}</span>}
                                </fieldset>
                            </div>
                            <div className="col-6">
                                <fieldset className="form-group">
                                    <label htmlFor="" className='form-label left-align'>
                                        Duracion: 
                                    </label>
                                    <input onChange={(e)=>changeInput(e)} type="number" name="duracion" id="" placeholder='Ingresa numero de dias...' 
                                    required min='1' max='365' value={activities.duracion} className={`form-control ${errors.duracion ? 'is-invalid' : ''}`} />
                                    {errors.duracion && <span className='error'>{errors.duracion}</span>}
                                </fieldset>
                            </div>
                            <div className="col-6">
                                <fieldset className="form-group">
                                <label htmlFor="" className='form-label left-align'>
                                    Dificultad: 
                                </label>
                                <select className={`form-control ${errors.dificultad ? 'select-is-invalid' : 'select'}`} onChange={(e)=>changeInput(e)} required name="dificultad" id="dificultad" defaultValue='Seleccionar'>
                                    <option value='Seleccionar'>Seleccionar</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                {errors.dificultad && <span className='error'>{errors.dificultad}</span>}
                                </fieldset>
                            </div>
                            <div className="col-6">
                                <fieldset className='form-group'>
                                    <label htmlFor="" className='form-label left-align'>
                                        Temporada: 
                                    </label>
                                    <select className={`form-control select ${errors.temporada ? 'select-is-invalid' : 'select'}`} onChange={(e)=>changeInput(e)} required name="temporada" id="" defaultValue='Seleccionar'>
                                        <option value='Seleccionar'>Seleccionar</option>
                                        <option value={'verano'}>Verano</option>
                                        <option value={'invierno'}>Invierno</option>
                                        <option value={'otoño'}>Otoño</option>
                                        <option value={'primavera'}>Primavera</option>
                                    </select>
                                    {errors.temporada && <span className='error'>{errors.temporada}</span>}
                                </fieldset>
                            </div>
                            <div className="col-6">
                                <fieldset className="form-group">
                                    <label htmlFor="" className='form-label left-align'>
                                    Buscar pais: 
                                    </label>
                                    <input type="text" id='paises' className='form-control searchCountry' onChange={(e)=>handleChange(e)} placeholder="Escribir pais..." />
                                    {errors.agregado && <span className='error'>{errors.agregado}</span>}
                                </fieldset>
                            </div>
                            <div className="center-text" id='activities-btn'>
                                {/* DESHABILITAR BOTON SI ERRORS TIENE ALGO */}
                                {errors.name || errors.duracion || errors.dificultad || errors.temporada || errors.agregado
                                ? <button type="submit" className="btn" disabled>Agregar</button> 
                                : <button type="submit" className="btn">Agregar</button>}
                            </div>
                        </div>
                    </div>
                
                {
                search.post?.length > 0 &&
                <>
                <div className='contenedor-countries'>
                    {   
                        agregado.length > 0 &&
                        <>
                        <span className='title-res'>Agregado:</span>
                        <hr />
                        <div className='res-container'>
                        {
                            agregado.map((element, index)=>(
                                <button
                                onClick={(e)=>handleClickRemoveToAgregado(e, element)} 
                                key={element.id_country }
                                    className='btn-res'>
                                    {element.name.common}
                                </button>  
                            ))
                        }
                        </div>
                        </>
                    }
                    <span className='title-res'>Resultados:</span>
                    <hr />
                    <div className='res-container'>
                    {
                        search.post.length === 0
                        ? <span className='error-res'>{search.error}</span>
                        : search.post.map((element, index)=>(
                            <button 
                            disabled={ agregado.find(e=>e.id_country === element.id_country) ? true : false }
                            onClick={(e)=>handleClickRemove(e, element)}
                            key={element.id_country }
                            className='btn-res'>
                                {element.name.common}
                            </button>
                        )) 
                    }
                    </div>
                </div>
                </>
                }
                </div>
                
            </form>
        </div>
        </Fragment>
    )
}

export default AddActivities