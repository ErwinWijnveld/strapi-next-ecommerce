// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createMollieClient from "@mollie/api-client";

export default async function handler(
    req: any,
    res: any
    ) {
    if (req.method === "POST") {
        
        if (req.body?.cart.length > 0) {

            const mollieClient = createMollieClient({
                apiKey: "test_TU5bzGs9FC3AJM4c7gvRUhUsU6Trxk",
            });

            const cart = req.body.cart;

            const getTotalPrice = () => {
                let total = 0;
                cart.forEach((item: any) => {
                    total += item.qty * item.attributes.price;
                }, (total = total));
                return total;
            };

            // generate description for payment
            const description = cart.map((item: any) => {
                return `${item.qty}x ${item.attributes.title}`;
            }).join(", ");
            
        

            const payment = await mollieClient.payments.create({
                amount: {
                    currency: "EUR",
                    value: getTotalPrice().toFixed(2).toString(),
                },
                description: description,
                redirectUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/order`,
            });
            
            const paymentUrl = payment.getPaymentUrl();
            
            res.status(200).json(paymentUrl)

        } else {
        res.status(200).json({error: 'No items in cart'})
        }
    }
}
