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
  SearchIcon
} from '../../../../../../../public/icons/icons';
import { DatePickerRange } from '@/components/DatePickerRange';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MobileFilter from './_components/MobileFilter';
import DataTable from './_components/DataTable';

export type Document = {
  date: string;
  name: string;
  company: string;
  email: string;
  status: 'revoke' | 'active' | 'expired';
};

function getData(): Document[] {
  // Fetch data from your API here.
  return [
    {
      date: '08-05-2023 16:47',
      name: 'Ali M.Kabaro',
      company: 'PT. Alam Rusak',
      email: 'aliando@gmail.com',
      status: 'revoke'
    },
    {
      date: '08-05-2023 16:47',
      name: 'Lirih',
      company: 'PT. Teror Dari Belantara',
      email: 'grace@gmail.com',
      status: 'active'
    },
    {
      date: '08-05-2023 16:47',
      name: 'Akbar Haka',
      company: 'PT. Lirih',
      email: 'lirih@gmail.com',
      status: 'expired'
    }
  ];
}

export default function Page() {
  const data = getData();
  const [status, setStatus] = useState<string>('');

  const t = useTranslations('Dashboard');
  const h = useTranslations('History.certificate');

  const onSelectChange = (status: string) => {
    setStatus(status);
  };

  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{h('title')}</h1>
      <div className="flex justify-between mt-7 mb-2">
        <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 md:gap-x-3 gap-x-2 gap-y-4 w-full md:w-fit">
          <div className="hidden md:flex">
            <DatePickerRange placeholder={h('validFrom')} />
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
          <div className="flex col-span-3 gap-2 md:col-auto">
            <div className="w-full">
              <Input
                placeholder={h('nameOrEmail')}
                className="h-10 pl-12 pr-2 w-full"
                icon={<SearchIcon svgClassName="mt-2" />}
                iconPosition="left"
              />{' '}
            </div>
            <div className="flex gap-1 md:hidden">
              {' '}
              <Button size="sm" className="p-4 font-semibold h-10">
                {t('table.search')}
              </Button>
              <MobileFilter />
            </div>
          </div>
          <Input
            placeholder={h('company')}
            className="h-10 pl-12 pr-2 hidden md:flex"
            icon={<SearchIcon svgClassName="mt-2 hidden md:block" />}
            iconPosition="left"
          />{' '}
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
