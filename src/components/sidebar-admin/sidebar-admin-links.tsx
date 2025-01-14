import React, { useContext } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { sidebarAdminLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import CollapsibleAdmin from '../collapsible-admin';
import { SidebarAdminContext } from './sidebar-admin-context-provider';

const sidebarMessages = {
  'sidebarAdmin.dashboard': 'Beranda',
  'sidebarAdmin.userManagement': 'Manajemen Pengguna',
  'sidebarAdmin.history': 'Riwayat',
  'sidebarAdmin.purchase': 'Pembelian',
  'sidebar.settings': 'Pengaturan'
};

const SidebarAdminLinks: React.FC<{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const t = useTranslations('Dashboard');
  const path = usePathname();
  const { state, stateSetter } = useContext(SidebarAdminContext);

  const checkPathname = (href: string) => {
    const lastPathSegment = path?.split('/').pop();
    const hrefLastSegment = href?.split('/').pop();

    // Check if the last segment of the current path matches exactly with the href's last segment
    const isIdenticalPathSegment =
      lastPathSegment && hrefLastSegment && lastPathSegment === hrefLastSegment;

    // Check if there is an exact match with subPath
    const isMatchingSubPath = sidebarAdminLinks.find(
      (link) =>
        link.path === href &&
        link.subPath &&
        link.subPath.some((sub) => `/${lastPathSegment}` === sub)
    );

    return !isIdenticalPathSegment && !isMatchingSubPath;
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      {sidebarAdminLinks.map((item) => {
        if (
          item.title === 'sidebarAdmin.history' ||
          item.title === 'sidebarAdmin.purchase'
        ) {
          return (
            <>
              <div
                onClick={() =>
                  stateSetter({
                    isOpen: true
                  })
                }
                className={cn(
                  `w-full !justify-start group font-semibold !px-3 hover:!text-primary  hover:!bg-secondary  p-2.5 rounded-xl ${checkPathname(item.path) ? 'bg-transparent !text-gray-1' : '!text-primary bg-secondary'} `,
                  {
                    '!justify-center': !state.isOpen,
                    hidden: state.isOpen,
                    'mt-3':
                      item.title === 'sidebarAdmin.purchase' && state.isOpen
                  }
                )}
              >
                {' '}
                <item.Icons
                  svgClassName={cn('flex-none mr-3', {
                    'mr-0': !state.isOpen
                  })}
                  pathClassName={cn(
                    'group-hover:fill-primary fill-[#828282] transition-colors',
                    {
                      'fill-primary': !checkPathname(item.path)
                    }
                  )}
                />
              </div>

              <CollapsibleAdmin
                key={item.title}
                autoOpen={!checkPathname(item.path)}
                headerClassName="!px-1"
                className={cn('w-full px-2 transition-all', {
                  hidden: !state.isOpen
                })}
                hideChevron={!state.isOpen} // Pass hideChevron prop
                header={
                  <div className="flex items-center font-semibold text-sm">
                    <item.Icons
                      svgClassName={cn('flex-none mr-3', {
                        'mr-0': !state.isOpen
                      })}
                      pathClassName={cn(
                        'group-hover:fill-primary fill-[#828282] transition-all',
                        {
                          'fill-primary': !checkPathname(item.path)
                        }
                      )}
                    />
                    {state.isOpen &&
                      t(`${item.title as keyof typeof sidebarMessages}`)}
                  </div>
                }
              >
                {item.title === 'sidebarAdmin.history' && (
                  <>
                    <Link
                      onClick={() => setOpen && setOpen(false)}
                      className={buttonVariants({
                        variant: 'secondary',
                        className: cn(
                          `w-full !justify-start group font-semibold !px-3 hover:!text-primary border border-transparent hover:border-[#E9F1FC] hover:bg-white ${checkPathname('/admin/dashboard/history/signing') ? 'bg-transparent !text-gray-1' : '!text-primary bg-white border border-[#E9F1FC]'} `,
                          { '!justify-center': !state.isOpen }
                        )
                      })}
                      href="/admin/dashboard/history/signing"
                    >
                      {t('signatureHistory')}
                    </Link>
                    <Link
                      onClick={() => setOpen && setOpen(false)}
                      className={buttonVariants({
                        variant: 'secondary',
                        className: cn(
                          `w-full !justify-start group font-semibold mt-1 !px-3 hover:!text-primary border border-transparent hover:border-[#E9F1FC] hover:bg-white ${checkPathname('/admin/dashboard/history/certificate') ? 'bg-transparent !text-gray-1' : '!text-primary bg-white border border-[#E9F1FC]'} `,
                          { '!justify-center': !state.isOpen }
                        )
                      })}
                      href="/admin/dashboard/history/certificate"
                    >
                      {t('CertificateHistory')}
                    </Link>
                  </>
                )}
                {item.title === 'sidebarAdmin.purchase' && (
                  <>
                    <Link
                      onClick={() => setOpen && setOpen(false)}
                      className={buttonVariants({
                        variant: 'secondary',
                        className: cn(
                          `w-full !justify-start group font-semibold !px-3 hover:!text-primary border border-transparent hover:border-[#E9F1FC] hover:bg-white ${checkPathname('/admin/dashboard/purchase/quota') ? 'bg-transparent !text-gray-1' : '!text-primary bg-white border border-[#E9F1FC]'} `,
                          { '!justify-center': !state.isOpen }
                        )
                      })}
                      href="/admin/dashboard/purchase/quota"
                    >
                      {t('QuotaPurchase')}
                    </Link>
                    <Link
                      onClick={() => setOpen && setOpen(false)}
                      className={buttonVariants({
                        variant: 'secondary',
                        className: cn(
                          `w-full !justify-start group font-semibold mt-1 !px-3 hover:!text-primary border border-transparent hover:border-[#E9F1FC] hover:bg-white ${checkPathname('/admin/dashboard/purchase/histories') ? 'bg-transparent !text-gray-1' : '!text-primary bg-white border border-[#E9F1FC]'} `,
                          { '!justify-center': !state.isOpen }
                        )
                      })}
                      href="/admin/dashboard/purchase/histories"
                    >
                      {t('HistoryPurchase')}
                    </Link>
                  </>
                )}
              </CollapsibleAdmin>
            </>
          );
        }

        return (
          <Link
            onClick={() => setOpen && setOpen(false)}
            className={buttonVariants({
              variant: 'secondary',
              className: cn(
                `w-full !justify-start group font-semibold !px-3 hover:!text-primary hover:!bg-secondary ${checkPathname(item.path) ? 'bg-transparent !text-gray-1' : '!text-primary'} `,
                { '!justify-center': !state.isOpen }
              )
            })}
            href={item.path}
            key={item.title}
          >
            <item.Icons
              svgClassName={cn('flex-none mr-3', {
                'mr-0': !state.isOpen
              })}
              pathClassName={cn(
                'group-hover:fill-primary fill-[#828282] transition-colors',
                {
                  'fill-primary': !checkPathname(item.path)
                }
              )}
            />
            {state.isOpen && t(`${item.title as keyof typeof sidebarMessages}`)}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarAdminLinks;
