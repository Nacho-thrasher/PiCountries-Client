import React, { Fragment, memo, useMemo } from 'react'
import './pagination.css'

const Pagination = memo(({data, paginate}) => {
    
    // postsPerPage, totalPosts, paginate, currentPage
    const { postsPerPage, currentPage } = data
    const totalPosts =  data.post?.length
    //? usememo para no renderizar el for 
    const pages = useMemo(() => {
        const pages = []
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pages.push(i)
        }
        return pages
    }, [totalPosts, postsPerPage])
    
    const handleClick = (e, number)=>{
        if (!e.innerHTML) {
            e.preventDefault() //? evitar el comportamiento por defecto
            let element = e.target //? agregar active al elemento que se haya seleccionado
            element.classList.add("active"); //? agregar active al elemento que se haya seleccionado
            let elements = element.parentElement.parentElement.children //? todos los elementos hijos del elemento padre
            for (let i = 0; i < elements.length; i++) {
                if (element.innerHTML !== elements[i].children[0].innerHTML) {
                    //?remover active de las demas paginas
                    elements[i].children[0].classList.remove("active");
                }
            }
        }
        paginate(number)
    }
    const handleClickPrevOrNext = (e)=>{
        e.preventDefault()
        let element = e.target
        let elements = element.parentElement.parentElement.children
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].children[0].className === 'active') {
                if (element.innerHTML === '«') {
                    if(elements[i].children[0].innerHTML === '1') return 
                    elements[i-1].children[0].classList.add("active")
                    elements[i].children[0].classList.remove("active")
                    return handleClick(elements[i].children[0], parseInt(elements[i].children[0].innerHTML) - 1)
                }else if(element.innerHTML === '»'){
                    if(elements[i].children[0].innerHTML === (elements.length - 2).toString()) return 
                    elements[i+1].children[0].classList.add("active")
                    elements[i].children[0].classList.remove("active")
                    return handleClick(elements[i].children[0], parseInt(elements[i].children[0].innerHTML) + 1)
                }
            }
        }
    }
    //! importante: manejar el active por estados
    

    return (
        <Fragment>
            
            <div className='paginate-container'>
            <ul className='border-pagination'>
            <li><a onClick={(e)=> handleClickPrevOrNext(e)} href="!#">«</a></li>
            {
                pages?.map((number) => (
                    <li key={number}>
                        <a className={number === currentPage ? 'active' : ''} onClick={(e)=>handleClick(e ,number)} href='!#' >{number}</a>
                    </li>
                ))
            }
            <li><a onClick={(e)=> handleClickPrevOrNext(e)} href="!#">»</a></li>
            </ul>
            </div>
        
        </Fragment>
    )
})

export default Pagination