'use client';
import { buttonVariants } from '@/components/ui/button';
import React from 'react';
import { UploadIcon } from '../../../../../../../../public/icons/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

type Props = {
  onUploadFileCSV: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
};

const UploadButton = (props: Props) => {
  const t = useTranslations('AddUser.addBulkUserCard');

  return (
    <div className="flex flex-col">
      <Label
        className={buttonVariants({
          size: 'lg',
          className:
            'w-fit font-semibold gap-2 md:px-6 px-2.5 admin-custom-shadow cursor-pointer'
        })}
        htmlFor="file"
      >
        <div className="flex-none">
          <UploadIcon pathClassName="fill-white" />{' '}
        </div>
        <p>{t('uploadCSV')}</p>
        <Input
          onChange={props.onUploadFileCSV}
          className="hidden"
          id="file"
          type="file"
          accept="csv"
        />
      </Label>
    </div>
  );
};

export default UploadButton;
