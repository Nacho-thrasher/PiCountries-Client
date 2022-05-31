import React, { Fragment } from 'react'
import './cards.css'
import Card from '../Card/Card.jsx'

const Cards = React.memo(({posts, loading}) => {
    //? memorizar el componente
    
    return (
    <Fragment>
        { loading ? <div className="loader"></div> :
            <div className='card-grid'>
            { 
                posts?.map((country) => (
                    <Card 
                    key={country.id_country} 
                    {...country}
                    />
                ))
            }
            </div>
        }
    </Fragment>
    )
})

export default Cards