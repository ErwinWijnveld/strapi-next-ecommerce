import React from 'react'

const TitlePrice = ({title, price}:any) => {
    return (
        <div className='flex justify-between items-end mb-8'>
            {title && <h1 className='font-bold text-5xl'>{title}</h1>}
            {price && <p className='price text-green-600 text-xl'>€{price}</p>}
        </div>
    )
}

export default TitlePrice