import { ht } from 'date-fns/locale';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { useFetchUser } from '../contexts/authContext';
import { fetcher } from '../lib/api';
import { getTokenFromLocalCookie, getTokenFromServerCookie } from '../lib/auth';
import markdownToHtml from '../lib/markdownToHtml';

const Home: NextPage = ({ page, products }: any) => {
	const { user, loading } = useFetchUser();

	const pageAttributes = page?.attributes;

	return (
		<Layout user={user}>
			<div className="container mb-12">
				{pageAttributes.title && (
					<h1 className="text-5xl uppercase font-bold mb-4">
						{pageAttributes.title}
					</h1>
				)}
				{pageAttributes?.content && (
					<div
						className="content max-w-4xl"
						dangerouslySetInnerHTML={{ __html: pageAttributes.content }}
					/>
				)}
			</div>

			<ProductGrid products={products} />
		</Layout>
	);
};

export default Home;

export async function getServerSideProps({ req, params }: any) {
	const jwt =
		typeof window !== 'undefined'
			? getTokenFromLocalCookie()
			: getTokenFromServerCookie(req);
	const pageResponse = await fetcher(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/?filters\[Slug\][$eq]=home&populate=*`,
		jwt
			? {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
			  }
			: ''
	);

	const productsResponse = await fetcher(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*`
	);

	return {
		props: {
			page: pageResponse.data[0],
			products: productsResponse,
		},
	};
}
