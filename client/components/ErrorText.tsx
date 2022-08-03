import React from 'react'

const ErrorText = ({error}:any) => {
    return (
        <p className='bg-red-700 rounded-xl px-4 py-2'>{error}</p>
    )
}

export default ErrorText