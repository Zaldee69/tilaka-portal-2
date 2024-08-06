'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/navigation';

import Pagination from '@/components/Pagination';
import {
  AccountCircleIcon,
  CancelScheduleIcon,
  ContactIcon,
  PermIdentityIcon,
  SupervisorAccountIcon
} from '../../../../../../../../public/icons/icons';
import { Document } from '../page';

const RejectConfirmationModal = ({
  isOpen,
  setIsOpen,
  d
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  d: (key: string) => string;
}) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-md">
      <DialogHeader className="flex items-center">
        <div className="bg-red-600/10 w-fit p-3 rounded-2xl">
          <CancelScheduleIcon />
        </div>
        <DialogDescription className="text-center text-black">
          <h4 className="mb-1 mt-4"> {d('table.cancelDialog.title')}</h4>
          <p className="mb-3">{d('table.cancelDialog.subtitle')}</p>
        </DialogDescription>
        <DialogFooter className="gap-3 justify-center">
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
            className="bg-white modal-button-shadow px-14 font-semibold"
          >
            {d('table.cancelDialog.cancelButton')}
          </Button>
          <Button variant="destructive" className="font-semibold px-14">
            {d('table.cancelDialog.confirmButton')}
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const getBadgeLabelAndColor = (
  status: string,
  type: 'popover' | 'row',
  d: (key: string) => string
) => {
  const badgeProps = {
    label: '',
    color: ''
  };

  switch (status) {
    case 'revoke':
      badgeProps.color = 'bg-[#929292]';
      badgeProps.label = 'Revoke';
      break;
    case 'active':
      badgeProps.color = 'bg-[#3B9B1B]';
      badgeProps.label = 'Active';
      break;
    case 'expired':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = 'Expired';
      break;

    default:
      break;
  }

  return { color: badgeProps.color, label: badgeProps.label };
};

const DataTable = ({
  data,
  showPagination = false,
  showSeeAllButton = false,
  actions
}: {
  data: Document[];
  showPagination?: boolean;
  showSeeAllButton?: boolean;
  actions?: React.ReactNode;
}) => {
  const d = useTranslations('History.certificate');
  const t = useTranslations('Dashboard');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPerPage, setContentPerPage] = useState<number>(5);

  return (
    <div>
      <RejectConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} d={d} />

      <div className="md:hidden">
        {data.length
          ? data.map((row) => (
              <div
                key={row.date}
                className="border rounded-xl py-2 px-3 border-gray-6 flex justify-between mt-3"
              >
                <div className="flex flex-col gap-2">
                  <Badge
                    className={`w-fit flex-none px-1.5 ${
                      getBadgeLabelAndColor(row.status, 'row', d).color
                    }`}
                  >
                    {getBadgeLabelAndColor(row.status, 'row', d).label}
                  </Badge>
                  <h5>{row.name}</h5>
                  <p className="text-xs">{row.date}</p>
                  <p className="text-xs">{row.company}</p>
                  <div className="flex gap-1 items-center">
                    <PermIdentityIcon svgClassName="w-5 h-5" />
                    <p className="text-xs">{row.email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="rounded-[10px] p-2"
                      align="end"
                    >
                      <DropdownMenuItem>
                        {t('table.actions.view')}
                      </DropdownMenuItem>

                      {row.status === 'active' && (
                        <DropdownMenuItem className="!cursor-pointer">
                          Revoke
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          : 'nothing'}
        {showSeeAllButton ? (
          <Link
            href="/dashboard/documents"
            className={buttonVariants({
              className: 'mt-5 w-full sign-button-shadow font-semibold',
              size: 'lg'
            })}
          >
            {d('viewAll')}
          </Link>
        ) : null}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-1">
              <TableHead>
                <div className="flex items-center gap-2">
                  {d('validFrom')}{' '}
                  <svg
                    width="11"
                    height="19"
                    viewBox="0 0 11 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9205 6.00469L5.78929 0.615691C5.64241 0.461436 5.3596 0.461436 5.21116 0.615691L0.0799114 6.00469C-0.110714 6.20564 0.0611615 6.5 0.368974 6.5H10.6315C10.9393 6.5 11.1112 6.20564 10.9205 6.00469Z"
                      fill="#C1C7D0"
                    />
                    <path
                      d="M10.6315 12.5H0.368974C0.0611615 12.5 -0.110714 12.7944 0.0799114 12.9953L5.21116 18.3843C5.35804 18.5386 5.64085 18.5386 5.78929 18.3843L10.9205 12.9953C11.1112 12.7944 10.9393 12.5 10.6315 12.5Z"
                      fill="#5E6C84"
                    />
                  </svg>
                </div>
              </TableHead>
              <TableHead>{d('name')}</TableHead>
              <TableHead>{d('email')}</TableHead>
              <TableHead>{d('company')}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-fit text-nowrap px-1.5 ${
                        getBadgeLabelAndColor(row.status, 'row', d).color
                      }`}
                    >
                      {getBadgeLabelAndColor(row.status, 'row', d).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-[10px] p-2"
                        align="end"
                      >
                        <DropdownMenuItem>
                          {t('table.actions.view')}
                        </DropdownMenuItem>

                        {row.status === 'active' && (
                          <DropdownMenuItem className="!cursor-pointer">
                            Revoke
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination ? (
        <Pagination
          contentPerPage={contentPerPage}
          setContentPerPage={setContentPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalElements={10}
          totalPages={5}
          isSuccess={true}
        />
      ) : null}
    </div>
  );
};

export default DataTable;
