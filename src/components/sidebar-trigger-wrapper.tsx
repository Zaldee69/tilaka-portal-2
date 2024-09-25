'use client';

import { usePathname } from '@/navigation';
import SidebarAdminCollpaseTrigger from './sidebar-admin/sidebar-admin-collapse-trigger';
import SidebarCollpaseTrigger from './sidebar/sidebar-collapse-trigger';

type Props = {};

const SidebarTriggerWrapper = (props: Props) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes('/admin') ? (
        <SidebarAdminCollpaseTrigger />
      ) : (
        <SidebarCollpaseTrigger />
      )}
    </>
  );
};

export default SidebarTriggerWrapper;
