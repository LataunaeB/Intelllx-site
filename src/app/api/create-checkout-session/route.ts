import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { pricing } from '@/config/pricing';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });

    // Create Stripe Checkout session for setup fee only (one-time payment)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // One-time payment for setup fee
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'LeadFlow Chatbot Setup',
              description: 'Complete setup includes: Custom conversation design, knowledge base training, branding integration, embed installation, calendar/CRM integration, notifications setup, QA testing, and live training session.',
            },
            unit_amount: pricing.products.chatbot.pro.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
      metadata: {
        service: 'LeadFlow Chatbot',
        setup_fee: pricing.products.chatbot.pro.price.toString(),
        monthly_fee: pricing.products.chatbot.pro.monthlyService.price.toString(),
        note: `Monthly fee of ${pricing.products.chatbot.pro.monthlyService.priceDisplay} will be set up after initial setup is complete`,
      },
      // Allow customer to update payment method
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
        stripeConfigured: !!process.env.STRIPE_SECRET_KEY
      },
      { status: 500 }
    );
  }
}