'use client';
import React from 'react';
import { TilakaIcon } from '../../../../../../../../public/icons/icons';

type Props = {
  amount: number;
  price: string;
};

const PricingCard = ({ price, amount }: Props) => {
  return (
    <div className="px-3 py-4 cursor-pointer rounded-xl w-full relative overflow-hidden border border-gray-6 flex flex-col flex-wrap justify-center gap-2 md:max-w-[275px]">
      <TilakaIcon
        svgClassName="w-20 h-20 absolute -top-5 -right-3"
        fill="#D0E0F233"
      />
      <p className="font-semibold text-sm">Tandatangan</p>
      <div className="flex justify-between z-10">
        <h4 className="text-admin-primary">
          {amount === 0 ? 'Custom' : amount}
        </h4>
        {price.length > 1 ? (
          <div className="rounded-full px-3 py-1 bg-[#0D5FB3] text-white">
            <p className="text-sm font-medium">{price}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PricingCard;
