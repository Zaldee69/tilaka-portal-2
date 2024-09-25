import AutoLoggedOutDialog from '@/components/dialog/auto-logged-out';
import CertExpiredDialog from '@/components/dialog/certificate-expired';
import CertRevokedDialog from '@/components/dialog/certificate-revoked';
import DeviceNotSupported from '@/components/dialog/device-not-supported';
import NoInternetDialog from '@/components/dialog/no-internet';
import TnCDialog from '@/components/dialog/term-and-condition';
import { TnCContextProvider } from '@/components/dialog/term-and-condition/tnc-context-provider';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { SidebarContextProvider } from '@/components/sidebar/sidebar-context-provider';
import SessionWrapper from '@/providers/session-provider';

const DashboarLayout = ({
  children,
  params,
  searchParams
}: {
  children: React.ReactNode;
  params: { locale: string };
  searchParams: {};
}) => {
  return (
    <SidebarContextProvider>
      <TnCContextProvider>
        <SessionWrapper>
          <main className="relative">
            <div className="flex">
              <Sidebar />
              <CertExpiredDialog />
              <CertRevokedDialog />
              <TnCDialog />
              <NoInternetDialog />
              <DeviceNotSupported />
              <AutoLoggedOutDialog />
              <div className="w-full">
                <Navbar />
                <div>{children}</div>
              </div>
            </div>
          </main>
        </SessionWrapper>
      </TnCContextProvider>
    </SidebarContextProvider>
  );
};

export default DashboarLayout;
