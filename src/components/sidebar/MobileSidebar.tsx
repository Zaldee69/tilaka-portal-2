'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import { BrushIcon, StampIcon, TilakaIcon } from '../../../public/icons/icons';
import SidebarLinks from './SidebarLinks';
import { useTranslations } from 'next-intl';

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  const t = useTranslations('Dashboard');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <AlignJustify className="text-gray-3" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className="bg-primary rounded-full flex items-center justify-center w-12 h-12 mx-auto">
            <p className="text-white font-bold ">Y</p>
          </div>
          <div className="text-center">
            <h5>Muhammad John Doe</h5>
            <p className="text-xs md:text-sm text-gray-400">johndoe2</p>
          </div>
          <div className="flex gap-2 justify-center">
            <div className=" flex items-center gap-2 bg-white custom-shadow h-9 px-6 rounded-[70px]">
              <BrushIcon svgClassName="w-5 h-5" />
              <p className="font-medium text-sm md:text-base">23</p>
            </div>
            <div className=" flex items-center gap-2 bg-white custom-shadow h-9 px-6 rounded-[70px]">
              <StampIcon svgClassName="w-5 h-5" />
              <p className="font-medium text-sm md:text-base">28</p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex justify-center mt-5 mb-10 mx-5">
          <Button className="rounded-full w-full flex justify-center gap-3 font-semibold sign-button-shadow">
            <TilakaIcon svgClassName="flex-none" />{' '}
            <h5>{t('sidebar.signPdfButton')}</h5>
          </Button>
        </div>

        <SidebarLinks setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
