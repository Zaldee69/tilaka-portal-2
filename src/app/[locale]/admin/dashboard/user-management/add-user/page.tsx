'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/navigation';
import React from 'react';
import UserRegistrationForm from './_components/add-user-form';
import AddUserProvider from '@/providers/add-user-provider';
import AddBulkUser from './_components/add-bulk-user';
import { useTranslations } from 'next-intl';

type Props = {};

const AddUser = (props: Props) => {
  const t = useTranslations('AddUser');

  return (
    <div className="p-5 mx-auto flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              className="font-medium"
              href="/admin/dashboard/user-management"
            >
              {t('userManagement')}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-semibold">
              {t('title')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-gray-1">{t('title')}</h1>
      <div className="md:p-4 md:border border-[#F3F3F3] rounded-md">
        <div className="flex flex-col gap-3">
          <p className="text-sm">{t('addUserCard.title')}:</p>
          <AddUserProvider>
            <UserRegistrationForm />
          </AddUserProvider>
        </div>
      </div>
      <div className="md:p-4 md:border border-[#F3F3F3] rounded-md">
        <div className="flex flex-col gap-3">
          <p className="text-sm">{t('addBulkUserCard.title')}:</p>
          <AddBulkUser />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
