import React from 'react'

const AddToCartButton = (props:any) => {

    let finalProps = {
        ...props,
        className: props.className + ' btn'
    }

    return (
        <button {...finalProps}>Add to cart</button>
    )
}

export default AddToCartButton