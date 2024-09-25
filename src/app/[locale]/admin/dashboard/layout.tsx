import Navbar from '@/components/navbar';
import SidebarAdmin from '@/components/sidebar-admin';
import { SidebarAdminContextProvider } from '@/components/sidebar-admin/sidebar-admin-context-provider';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarAdminContextProvider>
      <main className="relative">
        <div className="flex">
          <SidebarAdmin />
          <div className="w-full">
            <Navbar />
            <div>{children}</div>
          </div>
        </div>
      </main>
    </SidebarAdminContextProvider>
  );
};

export default DashboardLayout;
