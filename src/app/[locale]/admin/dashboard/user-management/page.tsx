'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  AddUserIcon,
  FilterAltIcon,
  SearchIcon
} from '../../../../../../public/icons/icons';
import CardsFilter from './_components/cards-filter';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DatePickerRange } from '@/components/DatePickerRange';
import DataTable from './_components/data-table';
import { useTranslations } from 'next-intl';
import MobileFilter from './_components/mobile-filter';
import { Link } from '@/navigation';

type Props = {};

export type UserRegistration = {
  date: string;
  name: string;
  email: string;
  status:
    | 'active'
    | 'inactive'
    | 'wait_for_registration'
    | 'expired'
    | 'pending'
    | 'accepted'
    | 'verification_failed'
    | 're_verification_rejected'
    | 'rejected';
};

function getData(): UserRegistration[] {
  // Fetch data from your API here.
  return [
    {
      date: '08-05-2023 16:47',
      name: 'Apalah',
      email: 'wahab@gmail.com',
      status: 'active'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'active'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'inactive'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'wait_for_registration'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'expired'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'pending'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'accepted'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'verification_failed'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 're_verification_rejected'
    },
    {
      date: '08-05-2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      email: 'wahab@gmail.com',
      status: 'rejected'
    }
  ];
}

const Page = (props: Props) => {
  const data = getData();
  const [status, setStatus] = useState<UserRegistration['status'] | null>(null);

  const t = useTranslations('UserManagement');

  const onSelectChange = (status: any) => {
    setStatus(status);
  };

  return (
    <div className="p-5 mx-auto flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-1">{t('title')}</h1>
        <Link href="/admin/dashboard/user-management/add-user">
          <Button
            size="lg"
            className="text-white font-semibold gap-3 admin-custom-shadow max-[460px]:p-3 max-[460px]:h-11"
          >
            <AddUserIcon pathClassName="fill-white" />{' '}
            <span className="hidden md:block">{t('addUser')}</span>
          </Button>
        </Link>
      </div>
      <CardsFilter />
      <div className="md:p-4 md:border border-[#F3F3F3] rounded-md">
        <div className="flex gap-3 mb-4">
          <div className="hidden md:block w-fit">
            <DatePickerRange placeholder={t('date')} />
          </div>
          <div className="w-full md:w-fit">
            <Input
              placeholder={t('username')}
              className="h-10 pl-12 pr-2 flex md:w-fit w-full"
              icon={<SearchIcon svgClassName="mt-2" />}
              iconPosition="left"
            />
          </div>
          <div className="hidden md:block">
            <Input
              placeholder="Email"
              className="h-10 pl-12 pr-2 flex md:w-fit w-full"
              icon={<SearchIcon svgClassName="mt-2" />}
              iconPosition="left"
            />
          </div>
          <div className="flex gap-1 md:hidden">
            {' '}
            <Button size="sm" className="p-4 font-semibold h-10">
              Search
            </Button>
            <MobileFilter />
          </div>
          <div className="hidden md:flex gap-3">
            <Select onValueChange={onSelectChange}>
              <SelectTrigger
                icon={<FilterAltIcon fill="#000" />}
                className={cn('hidden md:flex', {
                  'text-[#BDBDBD]': status === null
                })}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="hidden md:flex">
                <SelectItem value="active">{t('status.active')}</SelectItem>
                <SelectItem value="inactive">{t('status.inactive')}</SelectItem>
                <SelectItem value="waitForRegistration">
                  {t('status.waitForRegistration')}
                </SelectItem>
                <SelectItem value="expired">{t('status.expired')}</SelectItem>
                <SelectItem value="pending">{t('status.pending')}</SelectItem>
                <SelectItem value="accepted">{t('status.accepted')}</SelectItem>
                <SelectItem value="verificationFailed">
                  {t('status.verificationFailed')}
                </SelectItem>
                <SelectItem value="reVerificationRejected">
                  {t('status.reVerificationRejected')}
                </SelectItem>
                <SelectItem value="rejected">{t('status.rejected')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Page;
