'use client';
import { parseCSV } from '@/lib/utils';
import {
  UserRegistrationProps,
  userRegistrationSchema
} from '@/schemas/add-user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface CSVFile {
  nama: string;
  email: string;
}

export const useAddUserForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddUserSuccess, setIsAddUserSuccess] = useState<boolean>(false);
  const [csvFile, setcsvFile] = useState<CSVFile[]>([
    {
      nama: '',
      email: ''
    }
  ]);

  const t = useTranslations('AddUser');

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(userRegistrationSchema(t)),
    defaultValues: {
      users: [{ fullname: '', email: '' }]
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'users'
  });

  const onSubmit = methods.handleSubmit((data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAddUserSuccess(true);
      setIsLoading(false);
    }, 1000);
  });

  const onAddUserCard = () => {
    append({ fullname: '', email: '' });
  };

  const onDeleteUserCard = (index: number) => {
    remove(index);
  };

  return {
    onSubmit,
    onDeleteUserCard,
    onAddUserCard,
    setIsAddUserSuccess,
    isLoading,
    fields,
    methods,
    csvFile,
    isAddUserSuccess
  };
};
