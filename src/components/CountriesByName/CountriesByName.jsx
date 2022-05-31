import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Card from './../Card/Card';
import { getByName } from './../../actions/index';
import './countries.css'
import Pagination from './../../helpers/Pagination';

//no usar
const CountriesByName = () => {
    
    const { name } = useParams()
    const [ countries ] = useState(name)
    const dispatch = useDispatch()
    const countriesName = useSelector(state => state.countriesByName);
    
    const [data, setData] = useState({ 
        post: [],
        loading: true,
        error: null,
        currentPage: 1,
        postsPerPage: 10,
    })

    useEffect(() => { 
        dispatch(getByName(name)) 
        setData({ ...data, loading: false, post: countriesName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, name, countriesName]);
    // console.log(countriesName)
    
    const indexOfLasPost = data.currentPage * data.postsPerPage  //? 10
    const indexOfFirstPost = indexOfLasPost - data.postsPerPage //? 0
    const currentPosts = data.post?.slice(indexOfFirstPost, indexOfLasPost) //? [0,1,2,3,4,5,6,7,8,9]
  
    // useCallback
    const paginateMemo = useCallback((number) => {
        //? memorizar el numero de pagina
        setData({ ...data, currentPage: number })
      
    }, [data])

    return (
        <>

            <div className="container-countries-name">
                <span>Paises encontrados para: {name}</span>
                <hr />
            </div>
            <div className='card-grid'>
            { 
            currentPosts && currentPosts?.map((country) => (
                <Card 
                key={country.id_country} 
                {...country}
                />
            ))
            }
            </div>
            <hr />
            <Pagination data={data} paginate={paginateMemo}/>

        </>
    )
}

export default CountriesByName