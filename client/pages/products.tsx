import React from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { fetcher } from '../lib/api';

const Products = ({ products }: any) => {
	return (
		<Layout>
			<ProductGrid products={products} />
		</Layout>
	);
};

export default Products;

export async function getStaticProps() {
	const productsResponse = await fetcher(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*`
	);
	return {
		props: {
			products: productsResponse,
		},
	};
}
