'use client';
import { usePathname } from '@/navigation';
import React from 'react';
import { MobileAdminSidebar } from './sidebarAdmin/MobileAdminSidebar';
import { MobileSidebar } from './sidebar/MobileSidebar';

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
