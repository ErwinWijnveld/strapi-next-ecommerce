import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { imageToUrl } from '../utils/urls'
import AddToCartButton from './AddToCartButton'

const ProductCard = ({product} : any) => {
    const productAttributes = product?.attributes;

    return (
        <div className="product-card relative w-full p-4 bg-highlight rounded-xl">
            <Link href={`/products/${productAttributes?.slug}`}>
                <a>
                    <Image
                        src={imageToUrl(productAttributes?.images?.data[0])} 
                        width="100%" 
                        height={50}
                        layout="responsive" 
                        objectFit="cover"
                        className='rounded-xl'
                    />
                    {productAttributes?.title && <p className="title text-center mt-4 font-bold text-lg">{productAttributes.title}</p>}
                    {productAttributes?.price && <p className="price text-center mb-4">€{productAttributes.price}</p>}
                </a>
            </Link>
            <AddToCartButton className="w-full" />
        </div>
    )
}

export default ProductCard