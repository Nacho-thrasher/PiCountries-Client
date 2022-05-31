import React, { lazy, Suspense, Fragment, useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../actions/index'
import './homepage.css'
<<<<<<< HEAD

const Cards = lazy(() => import('./../Cards/Cards'));
const Pagination = lazy(() => import('../../helpers/Pagination'));
const Filters = lazy(() => import('./../filters/Filters'));
const Footer = lazy(() => import('../Footer/Footer'));
const LoginGoogle = lazy(() => import('../auth/LoginGoogle'));
const LogoutGoogle = lazy(() => import('../auth/LogoutGoogle'));
=======
import Cards from './../Cards/Cards';
import Pagination from '../../helpers/Pagination';
import Filters from './../filters/Filters';
import Footer from '../Footer/Footer'
import LoginGoogle from '../auth/LoginGoogle';
import LogoutGoogle from '../auth/LogoutGoogle';
>>>>>>> master

const HomePage = () => {

  const dispatch = useDispatch()
  const stableDispatch = useCallback(dispatch, [ dispatch ])
  const {countries, activities} = useSelector(state => state) 

  const [data, setData] = useState({ 
    post: [], 
    activities: [],
    loading: false,
    error: null,
    currentPage: 1,
    postsPerPage: 10,
  })
  
  useEffect(() => {
    if (countries.length === 0) {
      setData({...data, loading: true})
      stableDispatch(getAll())
    }
    setData({ ...data, loading: false, post: countries, activities: activities })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableDispatch, countries, activities])

  //? memorizar paginacion para no volver a hacer el slice
  const memoizedPagination = useMemo(() => {
      //? indexoflastPost
      const indexOfLasPost = data.currentPage * data.postsPerPage  //? 10
      //? indexoffirstPost
      const indexOfFirstPost = indexOfLasPost - data.postsPerPage //? 0
      //? currentPosts
      const currentPosts = data.post?.slice(indexOfFirstPost, indexOfLasPost) //? [0,1,2,3,4,5,6,7,8,9]
      return currentPosts
  }, [data])


  //? usecallback para paginate importante
  const paginate = useCallback((number) => {
    //? memorizar el numero de pagina
    setData({ ...data, currentPage: number })
  }, [data])
  // const paginate = (pageNumber) => setData({ ...data, currentPage: pageNumber })
  const setGenericDataMemo = useCallback(
    (values, page) => {
      setData({ ...data, post: values, currentPage: page })
    }
  , [data])
  // const setGenericData = (values, page) => setData({ ...data, post: values, currentPage: page })

  //? render
  return (
    <Fragment>
      <Suspense fallback={<div className="loader"></div>}>
      <div className="flex-grid">
        <div className="">
          <h2>login</h2>
          <LoginGoogle/>&nbsp;
          <LogoutGoogle/>
        </div>
        <div className="col-12">
          <Filters setGenericData={setGenericDataMemo} data={data} />        
        </div>
      </div>
      <hr />
      <Cards posts={memoizedPagination} loading={data.loading} />
      <hr />
      <Pagination data={data} paginate={paginate} />
      <Footer />
      </Suspense>
    </Fragment>
  )
}
export default HomePage
