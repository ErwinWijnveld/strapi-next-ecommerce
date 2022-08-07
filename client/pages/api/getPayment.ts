// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createMollieClient from "@mollie/api-client";

export default async function handler(
    req: any,
    res: any
    ) {
        console.log(req.method)
    if (req.method === "POST") {

        const mollieClient = createMollieClient({
            apiKey: "test_TU5bzGs9FC3AJM4c7gvRUhUsU6Trxk",
        });

        const payment = await mollieClient.payments.get(req.body.orderID);

        console.log(payment)

        
        return res.status(200).json(payment);
    }
    res.status(200).json({error: 'Invalid request'})
    return
}
