import ProductCard from "./ProductCard"

const ProductGrid = ({ products } : any) => {
    return (
        <div className="grid grid-cols-3 gap-8 container">
            {products && products?.data.map((product: any) => 
                <ProductCard key={product.id} product={product} />
            )}
        </div>
    )
}

export default ProductGrid