'use client';
import React from 'react';
import AddUserCard from './add-user-card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash } from 'lucide-react';
import { SendIcon } from '../../../../../../../../public/icons/icons';
import { useAddUserForm } from '@/hooks/use-add-user';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type Props = {};

const AddUserForm = (props: Props) => {
  const { fields, onAddUserCard, onDeleteUserCard } = useAddUserForm();

  const t = useTranslations('AddUser.addUserCard');

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field, idx) => (
        <>
          <AddUserCard key={field.id} index={idx}>
            {' '}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={idx === 0}
              className={cn(
                'md:mt-7 px-0',
                idx == 0 ? 'invisible md:flex hidden' : 'visible'
              )}
              onClick={() => onDeleteUserCard(idx)}
            >
              <Trash />
            </Button>
          </AddUserCard>
        </>
      ))}
      <div className="flex gap-3">
        <Button
          className="w-fit font-semibold gap-2 px-6 bg-white text-admin-primary hover:!bg-white"
          size="lg"
          type="button"
          onClick={onAddUserCard}
        >
          <PlusCircle /> {t('add')}
        </Button>
        <Button
          className="w-fit bg-admin-primary font-semibold gap-2 px-6 admin-custom-shadow"
          size="lg"
          type="submit"
        >
          <SendIcon pathClassName="fill-white" /> {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default AddUserForm;
