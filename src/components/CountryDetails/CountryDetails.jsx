import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOne } from '../../actions/index'
import { useParams } from 'react-router-dom'
import './countrydetails.css'

const CountryDetails = () => {

  
  const { id:code } = useParams()
  const [ id ] = useState(code)
  const dispatch = useDispatch()
  const country = useSelector(state => state.country);
  useEffect(() => { dispatch(getOne(id)) }, [dispatch, id]);

  // console.log(country)
  return (
    <Fragment>

      <div className="container-details">
        <div className="flex-grid">
          <div className="col-4">

            <div className="flex-grid">
              <div className="col-12">
                  <img src={country.imagen_bandera} className="border-radius-sm" alt={country.name?.common}/>
              </div>
            </div>
            <div className="flex-grid ">
              <div className="col-12">
                  <span>Mapa ubicacion</span>
              </div>
            </div>
            
          </div>
          <div className="col-6 border-container">
            <h2>{country.name?.common}</h2>
            <hr />
            <div className="p-1">
              <div>
                <span>Nombre Oficial: </span>
                <span>{country.name?.official}</span>
              </div>
              <div>
                <span>Capital: </span>
                <span>{country.capital}</span>
              </div>
              <div>
                <span>Continente: </span>
                <span>{country.continente}</span>
              </div>
              <div>
                <span>Region: </span>
                <span>{country.region}</span>
              </div>
              <div>
                <span>Sub Region: </span>
                <span>{country.subregion}</span>
              </div>
              <div>
                <hr />
                <div className="flex-grid">
                  <div className="col-12">
                  <span>Actividades: </span>
                    {/* SI NO HAY COUNTRIES */}
                    <div className="accordion">
                    {
                      country.activities?.length === 0 ? <span>No hay actividades</span> :
                      country.activities?.map((element) => {
                        return (
                          <div key={element.name} className="option">
                            <input type="checkbox" id={element.id_actividad} className="toggle" />
                            <label className="title" htmlFor={element.id_actividad}>{element.name}</label>
                            <div className="content">
                              <p>Dificultad: {element.dificultad}</p>
                              <p>Duracion: {element.duracion}</p>
                              <p>Temporada: {element.temporada}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default CountryDetails