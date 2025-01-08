import Stripe from 'stripe';
import { envConstant } from '.';

export const stripe = new Stripe(envConstant.STRIPE_SECRET_KEY, {});
