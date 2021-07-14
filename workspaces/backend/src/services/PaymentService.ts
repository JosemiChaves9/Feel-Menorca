import Stripe from "stripe";

const secretKey = process.env.SK_STRIPE as string;

const stripe = new Stripe(secretKey, {
  // @ts-ignore
  apiVersion: null,
});

export class PaymentService {
  static createCharge = async (id: string, amount: number) => {
    const stripeResponse = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      payment_method: id,
      confirm: true,
    });
    return stripeResponse.id;
  };
}
