import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const Order = ({ order }: any) => {
	// get current load post params

	return (
		<Layout>
			{order?.status && (
				<h1 className="p-24 text-5xl font-bold">Order {order.status}</h1>
			)}
		</Layout>
	);
};

export default Order;

export async function getServerSideProps(context: any) {
	const orderID = context?.query?.id;
	console.log(context);
	let order = null;
	// await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getPayment`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify({
	// 		orderID: orderID,
	// 	}),
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		order = data;
	// 	});

	return {
		props: {
			order: order ? order : null,
		},
	};
}
