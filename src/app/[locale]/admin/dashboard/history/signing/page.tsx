'use client';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';

import { SearchIcon } from '../../../../../../../public/icons/icons';
import { DatePickerRange } from '@/components/DatePickerRange';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MobileFilter from './_components/MobileFilter';
import DataTable from './_components/DataTable';

type Signer = {
  tilaka_name: string;
  email: string;
  status: 'signed' | 'pending' | 'sent' | 'denied';
};

export type Document = {
  date: string;
  name: string;
  initiator: {
    email: string;
    tilaka_name: string;
  };
  signer: Signer[];
  status: 'on_progress' | 'draft' | 'done' | 'denied';
};

function getData(): Document[] {
  // Fetch data from your API here.
  return [
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      initiator: {
        email: 'wahab@gmail.com',
        tilaka_name: 'wahab1'
      },
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        },
        {
          tilaka_name: 'husen123',
          email: 'menangkeri@kuru.com',
          status: 'pending'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'sent'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'denied'
        }
      ],
      status: 'on_progress'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      initiator: {
        email: 'wahab1@gmail.com',
        tilaka_name: 'wahab2'
      },
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        },
        {
          tilaka_name: 'husen123',
          email: 'menangkeri@kuru.com',
          status: 'signed'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'signed'
        }
      ],
      status: 'draft'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      initiator: {
        email: 'wahab3@gmail.com',
        tilaka_name: 'wahab3'
      },
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        }
      ],
      status: 'done'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS PT. Aji Karya',
      initiator: {
        email: 'wahab4@gmail.com',
        tilaka_name: 'wahab4'
      },
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husenalbadari@aji.com',
          status: 'signed'
        }
      ],
      status: 'denied'
    }
  ];
}

export default function Page() {
  const data = getData();

  const t = useTranslations('History.signing');

  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{t('title')}</h1>
      <div className="flex justify-between mt-7 mb-2">
        <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 md:gap-x-3 gap-x-2 gap-y-4 w-full md:w-fit">
          <div className="flex col-span-3 gap-2 md:col-auto">
            <div className="w-full">
              <Input
                placeholder={t('document')}
                className="h-10 pl-12 pr-2 w-full"
                icon={<SearchIcon svgClassName="mt-2" />}
                iconPosition="left"
              />{' '}
            </div>
            <div className="flex gap-1 md:hidden">
              {' '}
              <Button size="sm" className="p-4 font-semibold h-10">
                {t('search')}
              </Button>
              <MobileFilter />
            </div>
          </div>
          <div className="hidden md:flex">
            <DatePickerRange placeholder={t('date')} />
          </div>
          <Input
            placeholder={t('initiator')}
            className="h-10 pl-12 pr-2 hidden md:flex"
            icon={<SearchIcon svgClassName="mt-2 hidden md:block" />}
            iconPosition="left"
          />{' '}
          <Input
            placeholder={t('signer')}
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
