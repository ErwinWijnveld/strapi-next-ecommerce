import createMollieClient from '@mollie/api-client';
import Router from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useCart, useFetchCart } from '../contexts/cartContext';
import { getCartFromServerCookie } from '../lib/cart';
import { formatPrice } from '../utils/price';
import { imageToUrl } from '../utils/urls';

const checkout = ({ cartItems }: any) => {
	const [cart, setCart] = useState(cartItems ? cartItems : null);

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

	const createPayment = async () => {
		await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/payment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cart: cart,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				Router.push(data);
			});
	};

	return (
		<Layout>
			<section>
				<h1 className="sr-only">Checkout</h1>

				<div className="relative mx-auto max-w-screen-2xl">
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div className="py-12 md:py-24">
							<div className="max-w-lg px-4 mx-auto lg:px-8">
								<div className="flex items-center">
									<span className="w-10 h-10 bg-blue-900 rounded-full"></span>

									<h2 className="ml-4 font-medium">ErwinEcommerce</h2>
								</div>

								<div className="mt-8">
									<p className="text-2xl font-medium tracking-tight">
										{formatPrice(getTotalPrice())}
									</p>
									<p className="mt-1 text-sm text-gray-500">
										For the purchase of
									</p>
								</div>

								<div className="mt-12">
									<div className="flow-root">
										<ul className="-my-4 divide-y divide-gray-200">
											{cart &&
												cart.map((product: any, index: any) => {
													const productAttributes = product?.attributes;
													return (
														<li className="flex items-center justify-between py-4">
															<div className="flex items-start">
																{productAttributes?.images && (
																	<img
																		className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
																		src={imageToUrl(
																			productAttributes?.images.data[0]
																		)}
																		alt=""
																	/>
																)}

																<div className="ml-4">
																	{productAttributes?.title && (
																		<p className="text-sm">
																			{productAttributes?.title}
																		</p>
																	)}

																	<dl className="mt-1 space-y-1 text-xs text-gray-500">
																		<div>
																			<dt className="inline">Color:</dt>
																			<dd className="inline">Blue</dd>
																		</div>

																		<div>
																			<dt className="inline">Size:</dt>
																			<dd className="inline">UK 10</dd>
																		</div>
																	</dl>
																</div>
															</div>

															<div>
																{productAttributes?.price && (
																	<p className="text-sm">
																		{formatPrice(productAttributes?.price)}
																		<small className="text-gray-500">
																			x{product?.qty}
																		</small>
																	</p>
																)}
															</div>
														</li>
													);
												})}
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="py-12 bg-highlight md:py-24">
							<div className="max-w-lg px-4 mx-auto lg:px-8">
								<div className="grid grid-cols-6 gap-4">
									<div className="col-span-3">
										<label
											className="block mb-1 text-sm text-white"
											htmlFor="first_name"
										>
											First Name
										</label>

										<input
											className="rounded-lg shadow-sm border-highlightsecondary border w-full text-sm p-2.5 bg-transparent"
											type="text"
											id="frst_name"
										/>
									</div>

									<div className="col-span-3">
										<label
											className="block mb-1 text-sm text-white"
											htmlFor="last_name"
										>
											Last Name
										</label>

										<input
											className="rounded-lg shadow-sm border-highlightsecondary border w-full text-sm p-2.5 bg-transparent"
											type="text"
											id="last_name"
										/>
									</div>

									<div className="col-span-6">
										<label
											className="block mb-1 text-sm text-white"
											htmlFor="email"
										>
											Email
										</label>

										<input
											className="rounded-lg shadow-sm border-highlightsecondary border w-full text-sm p-2.5 bg-transparent"
											type="email"
											id="email"
										/>
									</div>

									<div className="col-span-6">
										<label
											className="block mb-1 text-sm text-white"
											htmlFor="phone"
										>
											Phone
										</label>

										<input
											className="rounded-lg shadow-sm border-highlightsecondary border w-full text-sm p-2.5 bg-transparent"
											type="tel"
											id="phone"
										/>
									</div>

									<fieldset className="col-span-6">
										<legend className="block mb-1 text-sm text-white">
											Card Details
										</legend>

										<div className="-space-y-px bg-transparent rounded-lg shadow-sm">
											<div>
												<label
													className="text-white sr-only"
													htmlFor="card-number"
												>
													Card Number
												</label>

												<input
													className="border-highlightsecondary border relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400 bg-transparent"
													type="text"
													name="card-number"
													id="card-number"
													placeholder="Card number"
												/>
											</div>

											<div className="flex -space-x-px">
												<div className="flex-1">
													<label
														className="sr-only"
														htmlFor="card-expiration-date"
													>
														Expiration Date
													</label>

													<input
														className="border-highlightsecondary border relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400 bg-transparent"
														type="text"
														name="card-expiration-date"
														id="card-expiration-date"
														placeholder="MM / YY"
													/>
												</div>

												<div className="flex-1">
													<label
														className="text-white sr-only"
														htmlFor="card-cvc"
													>
														CVC
													</label>

													<input
														className="border-highlightsecondary border  relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400 bg-transparent"
														type="text"
														name="card-cvc"
														id="card-cvc"
														placeholder="CVC"
													/>
												</div>
											</div>
										</div>
									</fieldset>

									<fieldset className="col-span-6">
										<legend className="block mb-1 text-sm text-white">
											Billing Address
										</legend>

										<div className="-space-y-px bg-transparent rounded-lg shadow-sm">
											<div>
												<label className="text-white sr-only" htmlFor="country">
													Country
												</label>

												<select
													className="border-highlightsecondary border relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 bg-transparent"
													id="country"
													name="country"
												>
													<option>England</option>
													<option>Wales</option>
													<option>Scotland</option>
													<option>France</option>
													<option>Belgium</option>
													<option>Japan</option>
												</select>
											</div>

											<div>
												<label
													className="text-white sr-only"
													htmlFor="postal-code"
												>
													ZIP/Post Code
												</label>

												<input
													className="border-highlightsecondary border relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400 bg-transparent"
													type="text"
													name="postal-code"
													id="postal-code"
													placeholder="ZIP/Post Code"
												/>
											</div>
										</div>
									</fieldset>

									<div className="col-span-6">
										<button
											onClick={() => createPayment()}
											className="btn w-full"
											type="submit"
										>
											Pay Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default checkout;

export async function getServerSideProps({ req, params }: any) {
	const cart = getCartFromServerCookie(req);

	const cartItems = await useFetchCart(cart);

	return {
		props: {
			cartItems: cartItems,
		},
	};
}
