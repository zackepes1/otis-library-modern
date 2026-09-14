import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { amount, recurring, name, email } = await request.json();

  if (!amount || amount < 1) {
    return Response.json({ error: "Invalid amount" }, { status: 400 });
  }

  const amountCents = Math.round(Number(amount) * 100);

  if (recurring) {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: { source: "otis-library-donate" },
    });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: amountCents,
      recurring: { interval: "month" },
      product_data: { name: "Monthly Donation — Otis Library" },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    type ExpandedInvoice = Stripe.Invoice & { payment_intent: Stripe.PaymentIntent };
    const invoice = subscription.latest_invoice as ExpandedInvoice;
    return Response.json({ clientSecret: invoice.payment_intent.client_secret });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "usd",
    receipt_email: email,
    metadata: { donorName: name, donorEmail: email, source: "otis-library-donate" },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
