'use client';
import React from 'react';
import AddUserInput from './add-user-input';
import { useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  index: number;
  children: React.ReactNode;
};

const AddUserCard = ({ index, children }: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const t = useTranslations('AddUser.addUserCard');

  return (
    <div className="w-full bg-[#F2F9FF] p-4 rounded-2xl flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <AddUserInput
          errors={errors}
          register={register}
          name={`users.${index}.fullname`}
          label={t('label')}
          placeholder={`${t('placeholder')}: John Doe`}
          type="text"
        />
        <AddUserInput
          errors={errors}
          register={register}
          name={`users.${index}.email`}
          label="Email"
          placeholder={`${t('placeholder')}: john.doe@company.com`}
          type="email"
        />
        <div className="hidden md:block">{children}</div>
      </div>
      <div className="flex gap-2 md:items-center">
        <Info size={16} className="text-primary flex-none" />
        <p className="text-xs text-gray-2">{t('information')}</p>
      </div>
      <div className="md:hidden flex justify-center">{children}</div>
    </div>
  );
};

export default AddUserCard;
