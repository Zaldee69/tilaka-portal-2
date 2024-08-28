import { PRICING } from '@/constants';
import React from 'react';
import PricingCard from './pricing-card';

type Props = {};

const PricingCards = (props: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {PRICING.map((price) => (
        <PricingCard
          amount={price.amount}
          price={price.price}
          key={price.amount}
        />
      ))}
    </div>
  );
};

export default PricingCards;
