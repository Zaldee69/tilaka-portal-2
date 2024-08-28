'use client';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  value: string;
  title: string;
  amount: string;
  setFilter: React.Dispatch<
    React.SetStateAction<'all' | 'active' | 'on_process' | 'inactive'>
  >;
  filter: 'all' | 'active' | 'on_process' | 'inactive';
  Icon: any;
};

const CardFilter = ({
  value,
  title,
  setFilter,
  filter,
  Icon,
  amount
}: Props) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={buttonVariants({
          size: 'lg',
          className: cn(
            'bg-white border w-fit border-[#F2F2F2] shadow-none text-gray-3 px-0 h-10 cursor-pointer',
            {
              'border-admin-primary text-admin-primary bg-[#F1F9FF]':
                value === filter
            }
          )
        })}
      >
        <CardContent className="flex justify-between items-center w-full px-3 py-0 gap-2">
          <Icon
            pathClassName={cn({
              'fill-admin-primary': value === filter
            })}
          />
          <p>{title}</p> ({amount})
          <div>
            <Input
              onChange={(e) => setFilter(e.target.value as any)}
              value={value}
              id={value}
              type="radio"
              className="hidden"
              name={'filter'}
            />
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default CardFilter;
