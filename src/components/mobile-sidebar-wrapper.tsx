'use client';
import { usePathname } from '@/navigation';
import React from 'react';
import { MobileAdminSidebar } from './sidebar-admin/mobile-admin-sidebar';
import { MobileSidebar } from './sidebar/mobile-sidebar';

type Props = {};

const MobileSidebarWrapper = (props: Props) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes('/admin') ? <MobileAdminSidebar /> : <MobileSidebar />}
    </>
  );
};

export default MobileSidebarWrapper;
