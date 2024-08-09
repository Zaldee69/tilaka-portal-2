'use client';

import { usePathname } from '@/navigation';
import SidebarAdminCollpaseTrigger from './sidebarAdmin/SidebarAdminCollpaseTrigger';
import SidebarCollpaseTrigger from './sidebar/SidebarCollpaseTrigger';

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
