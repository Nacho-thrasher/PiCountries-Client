import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import './navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from './../../actions/index';
// import { useHistory  } from 'react-router-dom';

const NavBar = React.memo(() => {
  
  const { user, countries } = useSelector(state => state)
  console.log('user', countries) 
  const dispatch = useDispatch()
  const stableDispatch = useCallback(dispatch, [ dispatch ])
  
  useEffect(() => {
    if (countries.length === 0) {
      stableDispatch(getAll())
    }
  }, [stableDispatch, countries])

  const [input, setInput] = useState({
    value: ''
  })
  const [search, setSearch] = useState({ //? state para buscar paises
    post: [],
    status: false,
    error: '',
  })

  const [showSubNav, setShowSubNav] = useState(false)

  const handleChange = (e)=>{
    setInput({ value: e.target.value })
    const value = e.target.value.trim()
    setShowSubNav(true)
    if(value === ''){
      setShowSubNav(false)
      return
    }
    else{ 
      const filtered = countries.filter((element)=> ((element.name.common).toLowerCase()).indexOf((value).toLowerCase()) !== -1)
      filtered.length === 0 
      ? setSearch({...search, post: [], error: `No se encontro coincidencia para: ${value}`}) 
      : setSearch({...search, post: filtered, error: ''})
    }  

  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSubNav(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    // despachar ese input para buscar
    if (input.value !== '') {
      // redirigir a la pagina de resultados con react router dom
      setInput({ value: '' })
      setShowSubNav(false)
      navigate(`/home/countries/name/${input.value}`);
    } 
  }
  

  return (
    <Fragment>
        <nav>
            <div className='nav-header'>
                <Link to='/home'>
                  <span className='marcaLogoFirst'>TRAVEL</span>
                  <span className='marcaLogoSecond'>Plans</span>
                </Link>
            </div>
            <div className='nav-links'>
                
                <div id='options' className="InputContainer">
                  <form onSubmit={handleSubmit}>
                  <input type="text" onChange={(e)=>handleChange(e)} className='inputNav' value={input.value} placeholder='Escriba aqui..'/>
                  </form>
                  <ul ref={wrapperRef} id='subnav' className={`subNav ${showSubNav && 'show'}`}>
                    {
                      search.post.length === 0
                      ? <li><span className='error-res'>{search.error}</span></li>
                      : search.post.map((element, index)=>(
                          <li key={element.id_country }>
                            <a href={`/home/country/${element.id_country}`}>
                              {element.name.common.length > 20 ? element.name.common.substring(0, 20) + '...' : element.name.common}
                            </a>
                            <img src={element.imagen_bandera} className="img-icono" alt="" />
                            <hr /> 
                          </li>
                      )) 
                    }
                  </ul>
                </div>

                <NavLink className={({ isActive }) =>
                  isActive ? 'active-nav' : undefined
                } to='/home' end ><span className='pl-2-nav'>Inicio</span></NavLink>
                <span>|</span>
                {/* ACTIVIDADES DENTRO COLOCAR BOTON CREAR ACTIVIDAD */}
                <NavLink className={({ isActive }) =>
                  isActive ? 'active-nav' : undefined
                } to='/home/add' end><span>Nueva Actividad</span></NavLink>
                <span>|</span>
                <NavLink className={({ isActive }) =>
                  isActive ? 'active-nav' : undefined
                } to='/home/activities' end><span>Actividades</span></NavLink>

                <span>|</span>
                <NavLink className={({ isActive }) =>
                  isActive ? 'active-nav' : undefined
                } to='/home/login' end><span>Iniciar Sesion</span></NavLink>
                <span>|</span>
                <button className='user-btn'>Usuario</button>

            </div>
        </nav>
    </Fragment>
  )
})

export default NavBar