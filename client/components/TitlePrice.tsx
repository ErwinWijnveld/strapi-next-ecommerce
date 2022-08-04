import React from 'react'
import Price from './Price'

const TitlePrice = ({title, price}:any) => {
    return (
        <div className='flex justify-between items-end mb-8'>
            {title && <h1 className='font-bold text-5xl'>{title}</h1>}
            {price && <Price regularPrice={price}/>}
        </div>
    )
}

export default TitlePrice