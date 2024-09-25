'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/navigation';

import Pagination from '@/components/pagination';
import { toast } from 'sonner';
import {
  PermIdentityIcon,
  SendIcon
} from '../../../../../../../public/icons/icons';
import { UserRegistration } from '../page';

const getBadgeLabelAndColor = (status: string, d: (key: string) => string) => {
  const badgeProps = {
    label: '',
    color: ''
  };

  switch (status) {
    case 'active':
      badgeProps.color = 'bg-[#3B9B1B]';
      badgeProps.label = d('status.active');
      break;
    case 'inactive':
      badgeProps.color = 'bg-[#929292]';
      badgeProps.label = d('status.inactive');
      break;
    case 'pending':
      badgeProps.color = 'bg-[#F2C94C]';
      badgeProps.label = d('status.pending');
      break;
    case 'accepted':
      badgeProps.color = 'bg-[#6FCF97]';
      badgeProps.label = d('status.accepted');
      break;
    case 'wait_for_registration':
      badgeProps.color = 'bg-[#F2C94C]';
      badgeProps.label = d('status.waitForRegistration');
      break;
    case 'verification_failed':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.verificationFailed');
      break;
    case 're_verification_rejected':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.reVerificationRejected');
      break;
    case 'verification_failed':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.verificationFailed');
      break;
    case 'expired':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.expired');
      break;
    case 'rejected':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.rejected');
      break;

    default:
      break;
  }

  return { color: badgeProps.color, label: badgeProps.label };
};

const DataTable = ({
  data,
  showSeeAllButton = false
}: {
  data: UserRegistration[];
  showPagination?: boolean;
  showSeeAllButton?: boolean;
}) => {
  const d = useTranslations('UserManagement');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPerPage, setContentPerPage] = useState<number>(5);

  return (
    <div>
      <div className="md:hidden flex flex-col gap-3">
        {data.length
          ? data.map((row) => (
              <div
                key={row.date}
                className="border rounded-xl py-2 px-3 border-gray-6 flex justify-between"
              >
                <div className="flex flex-col gap-2">
                  <Badge
                    className={`w-fit flex-none px-1.5 ${
                      getBadgeLabelAndColor(row.status, d).color
                    }`}
                  >
                    {getBadgeLabelAndColor(row.status, d).label}
                  </Badge>
                  <h5>{row.name}</h5>
                  <p className="text-xs">{row.date}</p>
                  <div className="flex gap-1 items-center">
                    <PermIdentityIcon svgClassName="w-5 h-5" />
                    <p className="text-xs">{row.email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  {row.status === 'wait_for_registration' ? (
                    <Button
                      size="sm"
                      className="gap-2 font-semibold text-xs px-3 rounded-sm"
                    >
                      <SendIcon pathClassName="fill-white" width={20} />
                    </Button>
                  ) : row.status === 'active' || row.status === 'inactive' ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-[10px] p-2"
                        align="end"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          {d('addQuota')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          {d('view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
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
                  {d('regDate')}
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
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>{d('action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-fit text-nowrap px-1.5 ${
                        getBadgeLabelAndColor(row.status, d).color
                      }`}
                    >
                      {getBadgeLabelAndColor(row.status, d).label}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {row.status === 'wait_for_registration' ? (
                      <Button
                        onClick={() =>
                          toast.success('Undangan berhasil dikirim')
                        }
                        size="sm"
                        className="gap-2 font-semibold text-xs px-3 rounded-sm"
                      >
                        <SendIcon pathClassName="fill-white" width={20} />
                        {d('resendInvitation')}
                      </Button>
                    ) : row.status === 'active' || row.status === 'inactive' ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="rounded-[10px] p-2"
                          align="end"
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            {d('addQuota')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            {d('view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
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

      <Pagination
        contentPerPage={contentPerPage}
        setContentPerPage={setContentPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalElements={10}
        totalPages={5}
        isSuccess={true}
      />
    </div>
  );
};

export default DataTable;
