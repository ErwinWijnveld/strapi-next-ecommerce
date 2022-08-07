import React, { useState } from 'react';
import { addProductToCart } from '../lib/cart';
import { imageToUrl } from '../utils/urls';
import Variations from './Variations';

const ProductPage = ({ product }: any) => {
	const productAttributes = product?.attributes;
	const [qty, setQty] = useState(1 as any);

	// images
	const images = productAttributes?.images?.data;
	const firstImage = images?.[0];
	const otherImages = images?.slice(1);

	console.log(productAttributes);

	const handleAddToCart = (product: any) => {
		// create cart cookie system
		addProductToCart(product.id, qty);
	};

	return (
		//     <!--
		//     This component uses @tailwindcss/htmlForms and @tailwindcss/aspect-ratio

		//     yarn add @tailwindcss/htmlForms @tailwindcss/aspect-ratio
		//     npm install @tailwindcss/htmlForms @tailwindcss/aspect-ratio

		//     plugins: [require('@tailwindcss/htmlForms'), require('@tailwindcss/aspect-ratio')]
		//   -->

		//   <style>
		//     .no-spinners {
		//       -moz-appearance: textfield;
		//     }

		//     .no-spinners::-webkit-outer-spin-button,
		//     .no-spinners::-webkit-inner-spin-button {
		//       margin: 0;
		//       -webkit-appearance: none;
		//     }
		//   </style>

		<section>
			<div className="relative max-w-screen-xl px-4 py-8 mx-auto">
				<div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-1">
						<div className="aspect-w-1 aspect-h-1">
							<img
								className="object-cover rounded-xl"
								src={imageToUrl(firstImage)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4 lg:mt-4">
							{otherImages?.map((image: any) => (
								<div className="aspect-w-1 aspect-h-1">
									<img
										className="object-cover rounded-xl"
										src={imageToUrl(image)}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="sticky top-0">
						{/* <strong className="border border-blue-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-blue-600">
							Pre Order
						</strong> */}

						<div className="flex justify-between mt-4">
							<div className="max-w-[35ch]">
								<h1 className="text-3xl font-bold">
									{productAttributes?.title}
								</h1>

								<p className="mt-0.5 text-sm">Highest Rated Product</p>

								<div className="flex mt-2 -ml-0.5">
									<svg
										className="w-5 h-5 text-yellow-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>

									<svg
										className="w-5 h-5 text-yellow-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>

									<svg
										className="w-5 h-5 text-yellow-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>

									<svg
										className="w-5 h-5 text-yellow-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>

									<svg
										className="w-5 h-5 text-gray-200"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</div>
							</div>

							{productAttributes?.price && (
								<p className="text-lg font-bold">€{productAttributes?.price}</p>
							)}
						</div>

						<details className="relative mt-4 group">
							<summary className="block">
								<div>
									{productAttributes?.short_description && (
										<div
											className="prose max-w-none group-open:hidden"
											dangerouslySetInnerHTML={{
												__html: productAttributes.short_description,
											}}
										/>
									)}

									<span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
										Read More
									</span>
								</div>
							</summary>

							{productAttributes?.description && (
								<div
									className="pb-6 prose max-w-none"
									dangerouslySetInnerHTML={{
										__html: productAttributes.description,
									}}
								/>
							)}
						</details>

						<div className="mt-8">
							{productAttributes?.variations &&
								productAttributes?.variations.map((variationGroup: any) => (
									<fieldset>
										{variationGroup?.variation_title && (
											<legend className="mb-1 text-sm font-medium">
												{variationGroup.variation_title}
											</legend>
										)}

										<div className="flow-root mb-4">
											<div className="flex flex-wrap -m-0.5">
												{variationGroup?.variations_list &&
													variationGroup?.variations_list.map(
														(variation: any) => (
															<label
																htmlFor={variation.variation_name}
																className="cursor-pointer p-0.5"
															>
																<input
																	type="radio"
																	name={variationGroup.variation_title}
																	id={variation.variation_name}
																	className="sr-only peer"
																/>

																<span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-highlightsecondary peer-checked:text-white">
																	{variation.variation_name}
																</span>
															</label>
														)
													)}
											</div>
										</div>
									</fieldset>
								))}
							{/* 
							<fieldset className="mt-4">
								<legend className="mb-1 text-sm font-medium">Size</legend>

								<div className="flow-root">
									<div className="flex flex-wrap -m-0.5">
										<label htmlFor="size_xs" className="cursor-pointer p-0.5">
											<input
												type="radio"
												name="size"
												id="size_xs"
												className="sr-only peer"
											/>

											<span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
												XS
											</span>
										</label>

										<label htmlFor="size_s" className="cursor-pointer p-0.5">
											<input
												type="radio"
												name="size"
												id="size_s"
												className="sr-only peer"
											/>

											<span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
												S
											</span>
										</label>

										<label htmlFor="size_m" className="cursor-pointer p-0.5">
											<input
												type="radio"
												name="size"
												id="size_m"
												className="sr-only peer"
											/>

											<span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
												M
											</span>
										</label>

										<label htmlFor="size_l" className="cursor-pointer p-0.5">
											<input
												type="radio"
												name="size"
												id="size_l"
												className="sr-only peer"
											/>

											<span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
												L
											</span>
										</label>

										<label htmlFor="size_xl" className="cursor-pointer p-0.5">
											<input
												type="radio"
												name="size"
												id="size_xl"
												className="sr-only peer"
											/>

											<span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
												XL
											</span>
										</label>
									</div>
								</div>
							</fieldset> */}

							<div className="flex mt-8">
								<div>
									<label htmlFor="quantity" className="sr-only">
										Qty
									</label>

									<input
										type="number"
										id="quantity"
										min="1"
										value={qty}
										onChange={(e) => setQty(parseInt(e.target.value))}
										className="w-12 py-2 text-xs text-center text-black border-gray-200 rounded no-spinners"
									/>
								</div>

								<button
									onClick={() => handleAddToCart(product)}
									type="submit"
									className="block px-5 py-2 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductPage;
