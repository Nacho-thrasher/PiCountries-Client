import React, { Fragment } from 'react'
import { useNavigate  } from 'react-router-dom';
import './landingPage.css'
//import { Link } from 'react-router-dom' //@react scroll
const LandingPage = () => {

  // let history = useHistory();
  let navigate = useNavigate();
  // let location = useLocation();

  const handlerClick = (e) => {
      e.preventDefault()
      // history.push(`/home`)
      navigate("/home");
  }

  return (
    <Fragment>
      <div className="landing-container">
        <div className="landing-container-content">
          <div className="m-2">
            <div onClick={(e)=>handlerClick(e)} className="content-title">
                <span className='span-bienvenidos'>Bienvenidos a </span>
                <span className='marcaLogoFirst'>TRAVEL</span>
                <span className='marcaLogoSecond'>Plans</span> 
            </div>
          </div>
          <div className="landing-parrafo">
            <p>
              Busca los mejores destinos para ti y tu familia.
              <br />
              Organiza tus viajes y comparte tus experiencias.
            </p>
            <button  onClick={(e)=>handlerClick(e)} className='landing-btn m-2'>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPage