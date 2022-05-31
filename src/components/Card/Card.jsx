import React, { Fragment } from 'react'
import styled from 'styled-components'
import './card.css'
import { useNavigate  } from 'react-router-dom';

const DivCard = styled.div`
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 0.2em;
    cursor: pointer;
    margin: 0.5rem;
    max-width: 280px;
    min-width: 280px;
    min-height: 220px;
    align-content: center;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    &:hover{
        -webkit-box-shadow: 8px 5px 21px 0px rgba(38,38,38,0.5); 
        box-shadow: 8px 5px 21px 0px rgba(38,38,38,0.5);       
    }
`;
const Card = React.memo((props) => {
    let navigate = useNavigate();
    const handlerClick = (e) => {
        e.preventDefault()
        navigate(`/home/country/${props.id_country}`);
    }
    
    return (
        <Fragment>
            <div className="wrapper">
            <div className="card" onClick={(e)=>handlerClick(e)}>
            <img className="card-image" alt={props.name.common} src={props.imagen_bandera}/>
            <div className="card-description">
                <p className="text-title">{props.name.common}</p>
                {/* <hr /> */}
                <p className="text-body">Continente: {props.continente}</p>
                <p className="text-body">Capital: {props.capital}</p>
            </div>
            </div>
            </div>
            
        </Fragment>
    )
})
export default Card
