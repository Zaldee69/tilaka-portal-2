import Navbar from '@/components/navbar/Navbar';
import SidebarAdmin from '@/components/sidebarAdmin';
import { SidebarAdminContextProvider } from '@/components/sidebarAdmin/SidebarAdminContextProvider';

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
