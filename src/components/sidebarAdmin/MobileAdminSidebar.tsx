'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import { AlignJustify, ExternalLink } from 'lucide-react';
import {
  BrushIcon,
  PeopleCircleIcon,
  QuestionAnswerIcon,
  StampIcon
} from '../../../public/icons/icons';
import SidebarAdminLinks from './SidebarAdminLinks';
import Link from 'next/link';

export function MobileAdminSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden" asChild>
        <AlignJustify className="text-gray-3" />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-12">
          <SheetClose asChild>
            <AlignJustify className="text-gray-3" />
          </SheetClose>
          <div className="bg-primary rounded-full flex items-center justify-center w-12 h-12 mx-auto">
            <p className="text-white font-bold ">Y</p>
          </div>
          <div className="text-center">
            <h5>Muhammad John Doe</h5>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div className="flex gap-2">
              <div className=" flex items-center gap-2 bg-white custom-shadow h-9 px-6 rounded-[70px]">
                <PeopleCircleIcon
                  pathClassName="fill-black"
                  svgClassName="w-5 h-5"
                />
                <p className="font-medium text-sm md:text-base">27</p>
              </div>
              <div className=" flex items-center gap-2 bg-white custom-shadow h-9 px-6 rounded-[70px]">
                <BrushIcon pathClassName="fill-black" svgClassName="w-5 h-5" />
                <p className="font-medium text-sm md:text-base">27</p>
              </div>
            </div>
            <div className=" flex items-center gap-2 bg-white custom-shadow h-9 px-6 rounded-[70px] w-fit">
              <StampIcon pathClassName="fill-black" svgClassName="w-5 h-5" />
              <p className="font-medium text-sm md:text-base">27</p>
            </div>
          </div>
        </SheetHeader>
        <SidebarAdminLinks setOpen={setOpen} />
        <div className="left-10 absolute -bottom-32 pb-5">
          <Link
            href="https://tilaka.id/ufaqs/"
            target="_blank"
            className="font-semibold flex gap-2 items-center"
          >
            <QuestionAnswerIcon fill="#828282" />
            <div className="text-sm text-gray-1">FAQ</div>
            <ExternalLink height={18} width={18} className="text-gray-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
