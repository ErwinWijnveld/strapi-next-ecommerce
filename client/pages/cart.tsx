import Link from 'next/link';
import { format } from 'node:path/win32';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useCart, useFetchCart } from '../contexts/cartContext';
import { getCartFromServerCookie, updateCartCookie } from '../lib/cart';
import { formatPrice } from '../utils/price';
import { imageToUrl } from '../utils/urls';

const Cart = ({ cartItems }: any) => {
	const [cart, setCart] = useState(cartItems ? cartItems : null);
	const [firstLoad, setfirstLoad] = useState(true);
	const [shipping, setShipping] = useState(6.7);

	const removeItem = (product: any) => {
		setCart((prev: any) => prev.filter((item: any) => item !== product));
	};

	const updateItem = (product: any, qty: any) => {
		setCart((prev: any) => {
			const newCart = prev
				.map((item: any) => {
					if (item === product) {
						return { ...item, qty };
					}
					return item;
				})
				.filter((item: any) => item.qty > 0);
			return newCart;
		});
	};

	const getTotalQuantity = () => {
		let total = 0;
		cart.forEach((item: any) => {
			total += item.qty;
		}),
			(total = total);
		return total;
	};

	const getTotalPrice = () => {
		let total = 0;
		cart.forEach((item: any) => {
			total += item.qty * item.attributes.price;
		}, (total = total));
		return total;
	};

	useEffect(() => {
		if (!firstLoad) {
			// dont fire on first render
			updateCartCookie(cart);
		} else {
			setfirstLoad(false);
		}
	}, [cart]);

	return (
		<Layout cart={cart}>
			<div className="container mx-auto mt-10">
				<div className="flex shadow-md my-10">
					<div className="w-3/4 bg-highlight rounded-xl px-10 py-10">
						{cart && cart.length > 0 ? (
							<>
								<div className="flex justify-between border-b pb-8">
									<h1 className="font-semibold text-2xl">Shopping Cart</h1>
									<h2 className="font-semibold text-2xl">
										{getTotalQuantity()} Items
									</h2>
								</div>
								<div className="flex mt-10 mb-5">
									<h3 className="font-semibold text-gray-200 text-xs uppercase w-2/5">
										Product Details
									</h3>
									<h3 className="font-semibold text-center text-gray-200 text-xs uppercase w-1/5 text-center">
										Quantity
									</h3>
									<h3 className="font-semibold text-center text-gray-200 text-xs uppercase w-1/5 text-center">
										Price
									</h3>
									<h3 className="font-semibold text-center text-gray-200 text-xs uppercase w-1/5 text-center">
										Total
									</h3>
								</div>

								{cart &&
									cart.map((product: any, index: any) => {
										const productAttributes = product?.attributes;

										return (
											<div
												className="flex items-center hover:bg-highlightsecondary -mx-8 px-6 py-5"
												key={index}
											>
												<div className="flex w-2/5">
													<div className="w-24">
														<Link href={`/products/${productAttributes.slug}`}>
															<a>
																<img
																	className="h-24 object-cover"
																	src={imageToUrl(
																		productAttributes.images.data[0]
																	)}
																	alt=""
																/>
															</a>
														</Link>
													</div>
													<div className="flex flex-col justify-around ml-4 flex-grow">
														{productAttributes?.title && (
															<Link
																href={`/products/${productAttributes.slug}`}
															>
																<a>
																	<span className="font-bold text-sm">
																		{productAttributes?.title}
																	</span>
																</a>
															</Link>
														)}
														<a
															onClick={() => removeItem(product)}
															className="font-semibold hover:text-red-500 text-gray-500 text-xs hover:cursor-pointer"
														>
															Remove
														</a>
													</div>
												</div>
												<div className="flex justify-center w-1/5">
													<svg
														className="fill-current text-gray-600 w-2 hover:cursor-pointer"
														viewBox="0 0 448 512"
														onClick={() =>
															updateItem(product, product.qty + -1 || 1)
														}
													>
														<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
													</svg>

													<input
														className="mx-2 border text-center w-8 text-black text-sm rounded-md"
														type="text"
														value={product.qty}
														onChange={(e) => {
															updateItem(product, e.target.value);
														}}
														readOnly
													/>

													<svg
														onClick={() => updateItem(product, product.qty + 1)}
														className="fill-current text-gray-600 w-2 hover:cursor-pointer"
														viewBox="0 0 448 512"
													>
														<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
													</svg>
												</div>
												<span className="text-center w-1/5 font-semibold text-sm">
													{formatPrice(productAttributes?.price)}
												</span>
												<span className="text-center w-1/5 font-semibold text-sm">
													{formatPrice(productAttributes?.price * product.qty)}
												</span>
											</div>
										);
									})}
							</>
						) : (
							<h2 className="no-products">No cart items found</h2>
						)}

						<a
							href="#"
							className="flex font-semibold text-indigo-600 text-sm mt-10"
						>
							<svg
								className="fill-current mr-2 text-indigo-600 w-4"
								viewBox="0 0 448 512"
							>
								<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
							</svg>
							Continue Shopping
						</a>
					</div>

					<div id="summary" className="w-1/4 px-8 py-10">
						<h1 className="font-semibold text-2xl border-b pb-8">
							Order Summary
						</h1>
						<div className="flex justify-between mt-10 mb-5">
							<span className="font-semibold text-sm uppercase">
								Items {getTotalQuantity()}
							</span>
							<span className="font-semibold text-sm">
								{formatPrice(getTotalPrice())}
							</span>
						</div>
						<div>
							<label className="font-medium inline-block mb-3 text-sm uppercase">
								Shipping
							</label>
							<select className="block p-2 text-gray-600 w-full text-sm">
								<option>Standard shipping - {formatPrice(shipping)}</option>
							</select>
						</div>
						<div className="py-10">
							<label
								htmlFor="promo"
								className="font-semibold inline-block mb-3 text-sm uppercase"
							>
								Promo Code
							</label>
							<input
								type="text"
								id="promo"
								placeholder="Enter your code"
								className="p-2 text-sm w-full"
							/>
						</div>
						<button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded-xl">
							Apply
						</button>
						<div className="border-t mt-8">
							<div className="flex font-semibold justify-between py-6 text-sm uppercase">
								<span>Total cost</span>
								<span>{formatPrice(getTotalPrice() + shipping)}</span>
							</div>
							<Link href="/checkout">
								<button className="btn w-full">Checkout</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;

export async function getServerSideProps({ req, params }: any) {
	const cart = getCartFromServerCookie(req);

	const cartItems = await useFetchCart(cart);

	return {
		props: {
			cartItems: cartItems,
		},
	};
}
