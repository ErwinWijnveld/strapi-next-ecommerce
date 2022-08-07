import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetcher } from '../lib/api';

type ShoppingCartContext = {
	getItemQuantity: (product: any) => number;
	increaseItemQuantity: (product: any) => void;
	decreaseItemQuantity: (product: any) => void;
	removeItem: (product: any) => void;
	updateItem: (product: any, qty: number) => void;
	getTotalQuantity: () => number;
	getTotalPrice: () => number;
	cart: any;
};

const CartContext = createContext({});

export const CartProvider = ({ children, cart }: any) => {
	const [cartItems, setCartItems] = useState([]);

	return (
		<CartContext.Provider
			value={{
				cart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);

export const useFetchCart = async (cart: any) => {
	if (!cart) {
		const cart = Cookies.get('ew_cart');
		var theCart = cart ? JSON.parse(cart) : [];
	} else {
		var theCart = cart;
	}

	if (theCart.length > 0) {
		const productIds: any = [];
		[
			theCart.forEach((item: any) => {
				productIds.push({ id: item.productId, qty: item.qty });
			}),
		];

		const allCartProducts = getProductsByIds(productIds);

		return allCartProducts;
	}

	return null;
};

export const getProductsByIds = async (ids: any) => {
	function turnIntoSeparateArraysWithDuplicatesSeparated(arr: any) {
		const result: any = [[]];
		arr.map((item: any) => {
			if (result[0].find((i: any) => i.id === item.id)) {
				result.push([item]);
			} else {
				result[0].push(item);
			}
		});
		return result;
	}

	const productIds = turnIntoSeparateArraysWithDuplicatesSeparated(ids);

	const allProductGroups: any = await Promise.all(
		productIds.map(async (products: any) => {
			// make strapi query per group from productIds
			let query = products.map((prod: any, index: any) => {
				return `filters[id][$in][${index}]=${prod.id}&`;
			});

			let theQuery = query.join('');

			// get products per group
			let productGroup = await fetcher(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/products/?${theQuery}&populate=deep`
			);

			// add qty to each product
			const productGroupWithQty = productGroup.data.map((product: any) => {
				product.qty = products.find((item: any) => item.id === product.id).qty;
				return product;
			});

			return productGroupWithQty;
		})
	);

	// add all products to one array
	const allProducts: any = [];

	allProductGroups.forEach((group: any) => {
		group.forEach((product: any) => {
			allProducts.push(product);
		});
	});

	return allProducts;
};
