'use client';
import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';

import {
  FilterAltIcon,
  SearchIcon,
  ShoppingCartIcon
} from '../../../../../../../public/icons/icons';
import { DatePickerRange } from '@/components/DatePickerRange';
import { Button, buttonVariants } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MobileFilter from './_components/MobileFilter';
import DataTable from './_components/DataTable';
import { Link } from '@/navigation';

export type Package = {
  date: string;
  name: string;
  price: string;
  totalPrice: string;
  status: 'waiting_for_payment' | 'success' | 'cancel';
};

function getData(): Package[] {
  // Fetch data from your API here.
  return [
    {
      date: '08-05-2023 16:47',
      name: 'Tandatangan 700',
      price: 'Rp1.900.000',
      totalPrice: 'Rp1.900.000',
      status: 'waiting_for_payment'
    },
    {
      date: '08-05-2023 16:47',
      name: 'Tandatangan 700',
      price: 'Rp1.900.000',
      totalPrice: 'Rp1.900.000',
      status: 'success'
    },
    {
      date: '08-05-2023 16:47',
      name: 'Tandatangan 700',
      price: 'Rp1.900.000',
      totalPrice: 'Rp1.900.000',
      status: 'cancel'
    }
  ];
}

export default function Page() {
  const data = getData();
  const [status, setStatus] = useState<string>('');

  const s = useTranslations('PurchaseHistory');

  const onSelectChange = (status: string) => {
    setStatus(status);
  };

  return (
    <div className="p-5 mx-auto">
      <div className="flex justify-between">
        <h1 className="text-gray-1">{s('title')}</h1>
        <Link
          href="/admin/dashboard/purchase/history"
          className={buttonVariants({
            className:
              'font-semibold gap-2 !px-4 !text-gray-1 bg-white admin-secondary-shadow border hover:!bg-white hover:border-transparent  border-[#DCE9F5]',
            variant: 'default',
            size: 'lg'
          })}
        >
          <ShoppingCartIcon pathClassName="fill-gray-1" /> {s('myCart')}
        </Link>
      </div>
      <div className="flex justify-between mt-7 mb-2">
        <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 md:gap-x-3 gap-x-2 gap-y-4 w-full md:w-fit">
          <div className="hidden md:flex">
            <DatePickerRange placeholder={s('purchaseDate')} />
          </div>
          <Input
            placeholder={s('packageName')}
            className="h-10 pl-12 pr-2 hidden md:flex"
            icon={<SearchIcon svgClassName="mt-2 hidden md:block" />}
            iconPosition="left"
          />{' '}
          <div className="flex col-span-3 gap-2 md:col-auto">
            <div className="w-full">
              <Input
                placeholder={s('packageName')}
                className="h-10 pl-12 pr-2 w-full"
                icon={<SearchIcon svgClassName="mt-2" />}
                iconPosition="left"
              />{' '}
            </div>
            <div className="flex gap-1 md:hidden">
              {' '}
              <Button size="sm" className="p-4 font-semibold h-10">
                {s('search')}
              </Button>
              <MobileFilter />
            </div>
          </div>
          <Select onValueChange={onSelectChange}>
            <SelectTrigger
              icon={<FilterAltIcon fill="#000" />}
              className={cn('hidden md:flex', {
                'text-[#BDBDBD]': status.length < 1
              })}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="hidden md:flex">
              <SelectItem value="dark">Revoke</SelectItem>
              <SelectItem value="system">Active</SelectItem>
              <SelectItem value="denied">Expired</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden col-span-1 md:flex gap-2">
            {' '}
            <Button className="px-7 font-semibold h-10">Filter</Button>
            <Button className="p-0 font-semibold" variant="ghost">
              Reset
            </Button>
          </div>
        </div>
      </div>
      <DataTable showPagination data={data} />
    </div>
  );
}
