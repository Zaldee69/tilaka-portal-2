import React from 'react';
import Image from 'next/image';
import NavbarMenu from './navbar-menu';
import { Input } from '../ui/input';
import { SearchIcon } from '../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import SidebarTriggerWrapper from '../sidebar-trigger-wrapper';
import MobileSidebarWrapper from '../mobile-sidebar-wrapper';

const Navbar = () => {
  const t = useTranslations('Navbar');
  return (
    <nav className="px-5 py-4 bg-white shadow-sm md:shadow-none sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className=" items-center gap-6 w-4/12 hidden lg:flex">
          <SidebarTriggerWrapper />
          <Input
            placeholder={t('searchDoc')}
            className="h-10 pl-10 w-full"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />
        </div>
        <div className="flex items-center gap-x-5">
          <MobileSidebarWrapper />
          <Image
            src="/images/logo-tilaka.png"
            height={30}
            width={118}
            alt="Tilaka Logo"
            className="lg:hidden"
            quality={100}
            priority
          />
        </div>
        <NavbarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
