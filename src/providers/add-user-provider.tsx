'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAddUserForm } from '@/hooks/use-add-user';
import Image from 'next/image';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

const AddUserProvider = ({ children }: Props) => {
  const {
    isLoading,
    methods,
    onSubmit,
    isAddUserSuccess,
    setIsAddUserSuccess
  } = useAddUserForm();

  const t = useTranslations('AddUser.modal');

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="h-full">
        <AlertDialog open={isAddUserSuccess} onOpenChange={setIsAddUserSuccess}>
          <AlertDialogContent className="max-w-md gap-7 pb-10">
            <AlertDialogHeader>
              <div className="gap-3 justify-center items-center flex flex-col px-5">
                {' '}
                <Image
                  src="/images/user-reg-sent.svg"
                  width={150}
                  height={270}
                  className="flex-none"
                  alt="Document Sent"
                />
                <AlertDialogTitle className="flex justify-center items-center gap-3">
                  {t('title')}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center whitespace-pre-line">
                  {t('text')}
                </AlertDialogDescription>
              </div>
            </AlertDialogHeader>

            <AlertDialogFooter className="!justify-center items-center">
              <AlertDialogAction className="admin-custom-shadow">
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog open={isLoading}>
          <DialogContent
            showCloseIcon={false}
            className="bg-transparent flex items-center justify-center border-none shadow-none"
          >
            <div className="w-[100px] p-0 h-[100px] !rounded-full flex items-center justify-center bg-white relative">
              <Image
                className="animate-spin"
                src="/images/ellipse.svg"
                height={73}
                width={73}
                alt="Tilaka Logo"
                quality={100}
                priority
              />
              <Image
                src="/images/tilaka.svg"
                className="absolute"
                height={35}
                width={33}
                alt="Tilaka Logo"
                quality={100}
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
        {children}
      </form>
    </FormProvider>
  );
};

export default AddUserProvider;
