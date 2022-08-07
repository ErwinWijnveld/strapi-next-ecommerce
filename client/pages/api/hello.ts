// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createMollieClient from "@mollie/api-client";

export default async function handler(
  req: any,
  res: any
) {
  const mollieClient = createMollieClient({
    apiKey: 'test_TU5bzGs9FC3AJM4c7gvRUhUsU6Trxk',
  });

  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: '69.99',
    },
    description: 'My first payment',
    redirectUrl: 'https://www.example.com/redirect',
  });

  const paymentUrl = payment.getPaymentUrl();

  res.status(200).json(req)
}
