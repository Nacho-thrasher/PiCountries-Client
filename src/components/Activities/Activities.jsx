import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteActivity } from '../../actions'
import './activities.css'
import { cleanMessage } from './../../actions/index';

const Activities = () => {
    
    const isMounted = useRef(true);
    const dispatch = useDispatch()
    const activities = useSelector(state => state.activities)
    const message = useSelector(state => state.message)
    const handleDelete = (id) => {
        dispatch(deleteActivity(id))    
        handleClose()
    }

    useEffect(() => {
        //? clean message
        return () => {
            if(message.length > 0){
                dispatch(cleanMessage())
                isMounted.current = false
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClose = ()=>{
        setTimeout(()=>{
            if(isMounted.current){    
                document.querySelector('.wrapper-success').classList.remove('show')
            }
        }, 3000)
    }

    return (
        <>
            {/* show alert */}
            <div className={`wrapper-success ${message && 'show'} `}>
                <div className="card">
                    <div className="icon"><i className="fas fa-check-circle"></i></div>
                    <div className="subject">
                        <h3>Success</h3>
                        <p>{message}</p>
                    </div>
                    <div onClick={()=>document.querySelector('.wrapper-success').classList.remove('show')} 
                        className="icon-times">
                            <i className="fas fa-times"></i>
                    </div>
                </div>
            </div>
            {/* Act */}
            <h1>Actividades</h1>
            <hr />
            <div className="accordion">
            {
                activities?.map((element) => {
                return (
                    <div key={element.name} className="option">
                    <input type="checkbox" id={element.id_actividad} className="toggle" />
                    <label className="title" htmlFor={element.id_actividad}>{element.name}</label>
                    <div className="content">
                        <p>Dificultad: {element.dificultad}</p>
                        <p>Duracion: {element.duracion}</p>
                        <p>Temporada: {element.temporada}</p>
                        <p>
                            Paises:
                            <br />
                            {element.countries.map((country) => (
                                <span key={country.id_country}>{country.name.common} -&nbsp;</span>
                            ))}      
                        </p>
                        <button onClick={(e)=>handleDelete(element.id_actividad)} className='btn-delete'>
                            Borrar
                        </button>
                    </div>
                    </div>
                )
                })
            }
            </div>
        </>
    )
}

export default Activities