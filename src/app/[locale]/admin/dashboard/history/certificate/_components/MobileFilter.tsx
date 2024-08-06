'use client';
import React, { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePickerRange } from '@/components/DatePickerRange';
import { Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SearchIcon } from '../../../../../../../../public/icons/icons';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const t = useTranslations('History.certificate');

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        className={buttonVariants({
          className: '!p-2.5 !h-10',
          variant: 'outline'
        })}
      >
        <Settings2 height={20} width={20} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pb-0">
          <DrawerTitle className="text-start">
            <div className="flex items-center justify-between">
              Filter{' '}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary font-semibold"
              >
                Reset
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 mt-3">
          <h5 className="mb-2">{t('validFrom')}</h5>
          <DatePickerRange placeholder={t('validFrom')} />
        </div>

        <div className="px-4 mt-3">
          <h5>{t('nameOrEmail')}</h5>
          <Input
            placeholder={t('nameOrEmail')}
            className="h-10 pl-12 pr-2 w-full mt-2"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />{' '}
        </div>

        <div className="px-4 mt-3">
          <h5>{t('company')}</h5>
          <Input
            placeholder={t('company')}
            className="h-10 pl-12 pr-2 w-full mt-2"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />
        </div>

        <div className="px-4 mt-3">
          <h5>Status</h5>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button size="sm" variant="outline" className="text-black">
              Revoke
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Active
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Expired
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={() => setIsOpen(false)}>Filter</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
