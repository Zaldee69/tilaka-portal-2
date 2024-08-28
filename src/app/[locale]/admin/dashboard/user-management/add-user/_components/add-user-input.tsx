import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  type: 'text' | 'email';
  label: string;
  placeholder: string;
  errors: FieldErrors<FieldValues>;
  form?: string;
  name: string;
  register: UseFormRegister<any>;
};

const AddUserInput = ({
  type,
  label,
  placeholder,
  form,
  name,
  errors,
  register
}: Props) => {
  return (
    <Label className="w-full">
      <p className="mb-2 !text-gray-2">{label && label}</p>
      <Input
        id={`input-${label}`}
        type={type}
        placeholder={placeholder}
        form={form}
        autoComplete="off"
        {...register(name)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-red-400 mt-2">
            {message === 'Required' ? '' : message}
          </p>
        )}
      />
    </Label>
  );
};

export default AddUserInput;
