'use client';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { SidebarAdminContext } from './sidebar-admin-context-provider';

const SidebarAdminCollpaseTrigger = () => {
  const { state, stateSetter } = useContext(SidebarAdminContext);

  return (
    <Button
      className="p-0 w-fit h-fit hidden md:block"
      variant="ghost"
      onClick={() => stateSetter({ isOpen: !state.isOpen })}
    >
      <Menu />
    </Button>
  );
};

export default SidebarAdminCollpaseTrigger;
