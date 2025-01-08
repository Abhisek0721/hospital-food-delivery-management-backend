import { PlanSeedData } from '@constants/plan.seed';
import { Injectable, Logger } from '@nestjs/common';
import { CurrencyEnum } from '@prisma/client';
import {
  createOneTimePaymentPrice,
  createProductAndPriceForSubscription,
} from 'src/helpers/stripe-payments';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly prisma: PrismaService) {}

  async pricingPlanSeed() {
    // Insert users if they don't exist
    for (const plan of PlanSeedData) {
      const checkPlan = await this.prisma.plan.findUnique({
        where: {
          name: plan.name,
        },
      });

      if (!checkPlan) {
        const createStripePlan = await createProductAndPriceForSubscription({
          name: plan.name,
          currency: 'usd',
          description: plan.description,
          subscription_interval: 'month',
          unit_amount: plan.price,
        });

        const createOneTimePaymentPriceAndPlan =
          await createOneTimePaymentPrice({
            name: plan.name,
            currency: 'usd',
            description: plan.description,
            unit_amount: plan.price,
          });

        const createPlan = await this.prisma.plan.create({
          data: {
            name: plan.name,
            description: plan.description,
            currency: CurrencyEnum.USD,
            price: plan.price,
            credits: plan.credits,
            stripe_plan_id: createStripePlan.product?.id,
            stripe_price_id: createStripePlan?.price?.id,
            stripe_one_time_payment_plan_id:
              createOneTimePaymentPriceAndPlan?.product?.id,
            stripe_one_time_payment_price_id:
              createOneTimePaymentPriceAndPlan?.price?.id,
          },
        });

        this.logger.log(`Seeder: Plan ${createPlan.name} created.`);
      } else {
        this.logger.log(`Seeder: Plan ${plan.name} already exists.`);
      }
    }
  }
}
