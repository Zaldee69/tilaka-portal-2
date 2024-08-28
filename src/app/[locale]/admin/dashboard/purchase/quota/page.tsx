'use client';
import React from 'react';
import { HistoryCircleIcon } from '../../../../../../../public/icons/icons';
import PricingCards from './_components/pricing-cards';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations('PurchaseQuota');
  return (
    <div className="p-5 mx-auto flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-gray-1">{t('title')}</h1>
        <Link
          href="/admin/dashboard/purchase/history"
          className={buttonVariants({
            className:
              'font-semibold gap-2 !px-4 !text-gray-1 bg-white admin-secondary-shadow border hover:!bg-white hover:border-transparent  border-[#DCE9F5]',
            variant: 'default',
            size: 'lg'
          })}
        >
          <HistoryCircleIcon pathClassName="fill-gray-1" />{' '}
          {t('purchaseHistory')}
        </Link>
      </div>
      <p className="font-semibold">{t('packageName')}:</p>
      <PricingCards />
    </div>
  );
};

export default Page;
