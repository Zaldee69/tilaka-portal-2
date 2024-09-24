import AutoLoggedOutDialog from '@/components/dialog/AutoLoggedOut';
import CertExpiredDialog from '@/components/dialog/CertExpired';
import CertRevokedDialog from '@/components/dialog/CertRevoked';
import DeviceNotSupported from '@/components/dialog/DeviceNotSupported';
import NoInternetDialog from '@/components/dialog/NoInternet';
import TnCDialog from '@/components/dialog/term-and-condition/Tnc';
import { TnCContextProvider } from '@/components/dialog/term-and-condition/TncContextProvider';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar';
import { SidebarContextProvider } from '@/components/sidebar/SidebarContextProvider';
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
