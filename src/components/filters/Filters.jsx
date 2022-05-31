import React, { useMemo } from 'react'
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import './filters.css'

const Filters = React.memo(({setGenericData, data}) => {
    
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities)
    
    //? memorizar reduce para no volver a hacer el reduce
    const memoizedReduceContinente = useMemo(() => {
        return countries?.map((element)=>element.continente[0]).reduce((acc, country) => {
            if (!acc.includes(country)) { acc.push(country) }
            return acc
        }, [])
    }, [countries])
    // const continentes = countries?.map((element)=>element.continente[0]).reduce((acc, country) => {
    //     if (!acc.includes(country)) { acc.push(country) }
    //     return acc
    // }, [])
    const memoizedReduceActividad = useMemo(() => {
        return activities?.map((element)=>element.name.toLowerCase()).reduce((acc, activity) => {
            if (!acc.includes(activity)) { acc.push(activity) }
            return acc
        }, [])
    }, [activities])
    // const actividades = activities?.map((element)=>element.name.toLowerCase()).reduce((acc, activity) => {
    //     if (!acc.includes(activity)) { acc.push(activity) }
    //     return acc
    // }, [])
    

    //? FILTROS NUEVOS
    const [isOpen, setOpen] = useState({
        continente: false,
        alfabeticoOrPoblacion: false,
        actividad: false
    })
    const [selectedItem, setSelectedItem] = useState({
        continente: null,
        alfabeticoOrPoblacion: {value: null, order: null},
        actividad: null
    });
    //? abrir dropdown
    const toggleDropdown = (type) => { //?setear true en isopen
        setOpen({ ...isOpen, [type]: !isOpen[type] })
    } 
    //? cierra dropdown si esta abierto y por defecto es false
    const handleItemClick = (e, value, type) => {
        const target = e.target.children[0].className
        setOpen({ ...isOpen, [type]: !isOpen[type] })   
        if (target.includes('selected')) {
            setSelectedItem({ ...selectedItem, [type]: null });
            handleFilter(type, false)
        }else{
            setSelectedItem({ ...selectedItem, [type]: value });
            handleFilter(type, value)
        }
    }
    const orderAscDes = (value, type) => {
        setOpen({ ...isOpen, [type]: !isOpen[type] })
        if (selectedItem[type].order === 'asc') {
            setSelectedItem({ ...selectedItem, [type]: {value: value, order: 'desc' }});
            return value === 'alfabetico'
            ? setGenericData(data.post.sort((a,b)=>b.name.common.localeCompare(a.name.common)), 1)
            : setGenericData(data.post.sort((a,b)=>b.poblacion - a.poblacion), 1)       
        }
        setSelectedItem({ ...selectedItem, [type]: {value: value, order: 'asc' }});
        return value === 'alfabetico'
        ? setGenericData(data.post.sort((a,b)=>a.name.common.localeCompare(b.name.common)), 1)
        : setGenericData(data.post.sort((a,b)=>a.poblacion - b.poblacion), 1)
    }
    //? funcion seteadora de los filtros
    const handleFilter = async (type, value) => {
        if (type === 'continente') {
            value ? await setGenericData(countries.filter((element)=>element.continente[0] === value), 1) : setGenericData(countries, 1)
        }
        if (type === 'actividad') {
            value ? await setGenericData(activities.find((element)=>element.name.toLowerCase() === value).countries, 1) : setGenericData(countries, 1)
        }
    }
    //? alfabetico o poblacion
    const orderAlphabeticoOrPoblacion = ['alfabetico', 'poblacion']
    
    return (
    <Fragment>
    <div className='inputs-filtros'>
        {/* Continentes */}
        <div className="filters-inline">
        <div className='dropdown'>
            <div className='dropdown-header' onClick={()=>toggleDropdown('continente')}>
                {selectedItem.continente ? memoizedReduceContinente.find((item)=> item === selectedItem.continente) : `Orden por continente`}
                <i className={`fa fa-chevron-right icon ${isOpen.continente && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen.continente && 'open'}`}>
                {memoizedReduceContinente.map((item)=> (
                <div className="dropdown-item" onClick={(e)=> handleItemClick(e, item, 'continente')} key={item}>
                    <span className={`dropdown-item-dot ${item === selectedItem.continente && 'selected'}`}>• </span>
                    {item}
                </div>
                ))}
            </div>
        </div>
        </div>
        {/* Alfabetico y poblacion */}
        <div className="filters-inline">
        <div className='dropdown'>
            <div className='dropdown-header font-upper' onClick={()=>toggleDropdown('alfabeticoOrPoblacion')}>
                {selectedItem.alfabeticoOrPoblacion.value 
                    ? `${selectedItem.alfabeticoOrPoblacion.value} (${selectedItem.alfabeticoOrPoblacion.order})` 
                    : `Orden A-Z / Poblacion`
                }
                <i className={`fa fa-chevron-right icon ${isOpen.alfabeticoOrPoblacion && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen.alfabeticoOrPoblacion && 'open'}`}>
                {orderAlphabeticoOrPoblacion.map((item)=> (
                <div className="dropdown-item font-upper" onClick={(e)=> orderAscDes(item, 'alfabeticoOrPoblacion')} key={item}>
                    {item}
                    <span> {item === selectedItem.alfabeticoOrPoblacion.value && selectedItem.alfabeticoOrPoblacion.order }</span>
                </div>
                ))}
            </div>
        </div>
        </div>
        {/* Actividades */}
        <div className="filters-inline">
        <div className='dropdown'>
            <div className='dropdown-header' onClick={()=>toggleDropdown('actividad')}>
                {selectedItem.actividad ? memoizedReduceActividad.find((item)=> item === selectedItem.actividad) : `Orden por actividad`}
                <i className={`fa fa-chevron-right icon ${isOpen.actividad && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen.actividad && 'open'}`}>
                {memoizedReduceActividad?.map((item)=> (
                <div className="dropdown-item" onClick={(e)=> handleItemClick(e, item, 'actividad')} key={item}>
                    <span className={`dropdown-item-dot ${item === selectedItem.actividad && 'selected'}`}>• </span>
                    {item}
                </div>
                ))}
            </div>
        </div>
        </div>
        {/*  */}
    </div>
    </Fragment>
  )
})

export default Filters