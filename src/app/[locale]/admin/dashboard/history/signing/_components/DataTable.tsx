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

import { Input } from '@/components/ui/input';

import { buttonVariants } from '@/components/ui/button';
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
import { Document } from '@/app/[locale]/dashboard/documents/page';
import { Link } from '@/navigation';
import {
  AccountCircleIcon,
  ContactIcon,
  PermIdentityIcon,
  SupervisorAccountIcon
} from '../../../../../../../../public/icons/icons';
import Pagination from '@/components/Pagination';
import { toast } from 'sonner';

const getBadgeLabelAndColor = (
  status: string,
  type: 'popover' | 'row',
  d: (key: string) => string
) => {
  const badgeProps = {
    label: '',
    color: ''
  };

  if (type === 'popover') {
    switch (status) {
      case 'pending':
        badgeProps.color = 'bg-[#FFB951]';
        badgeProps.label = d('table.signerStatus.waiting');
        break;
      case 'sent':
        badgeProps.color = 'bg-[#929292]';
        badgeProps.label = d('table.signerStatus.sent');
        break;
      case 'signed':
        badgeProps.color = 'bg-[#3B9B1B]';
        badgeProps.label = d('table.signerStatus.signed');
        break;
      case 'denied':
        badgeProps.color = 'bg-[#BD0505]';
        badgeProps.label = d('table.signerStatus.denied');
        break;

      default:
        break;
    }
  } else {
    switch (status) {
      case 'on_progress':
        badgeProps.color = 'bg-[#FFB951]';
        badgeProps.label = 'On Progress';
        break;
      case 'draft':
        badgeProps.color = 'bg-[#929292]';
        badgeProps.label = 'Draft';
        break;
      case 'done':
        badgeProps.color = 'bg-[#3B9B1B]';
        badgeProps.label = 'Done';
        break;
      case 'denied':
        badgeProps.color = 'bg-[#BD0505]';
        badgeProps.label = 'Denied';
        break;

      default:
        break;
    }
  }

  return { color: badgeProps.color, label: badgeProps.label };
};

function convertDateFormat(inputDate: string): string {
  // Map month numbers to month names
  const monthNames: string[] = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  // Split the input date into date and time components
  const [datePart, timePart] = inputDate.split(' ');

  // Further split the date into day, month, and year
  const [month, day, year] = datePart.split('-');

  // Parse the month as an integer to get the month name
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Construct and return the formatted date string
  return `${monthName} ${day}, ${year} ${timePart}`;
}

const DataTable = ({
  data,
  showSeeAllButton = false,
  actions
}: {
  data: Document[];
  showPagination?: boolean;
  showSeeAllButton?: boolean;
  actions?: React.ReactNode;
}) => {
  const d = useTranslations('Dashboard');
  const t = useTranslations('History.signing');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPerPage, setContentPerPage] = useState<number>(5);

  return (
    <div>
      <div className="md:hidden">
        {data.length
          ? data.map((row) => (
              <div
                key={row.date}
                className="border rounded-xl py-2 px-3 border-gray-6 flex justify-between"
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
                  <div className="flex gap-1 items-center">
                    <PermIdentityIcon svgClassName="w-5 h-5" />
                    <p className="text-xs">{row.initiator.email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                      {row.status === 'on_progress' ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className="cursor-pointer"
                            asChild
                          >
                            <Ellipsis />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="rounded-[10px] p-2"
                            align="end"
                          >
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                toast.success('URL berhasil di-copy!')
                              }
                            >
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                toast.success('Pengingat berhasil dikirim!')
                              }
                            >
                              {t('sendReminder')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <div></div>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="rounded-[10px] p-2"
                      align="end"
                    ></DropdownMenuContent>
                  </DropdownMenu>

                  <Popover>
                    <PopoverTrigger className="flex gap-1 items-center">
                      <p className="font-semibold text-sm">
                        {row.signer.length}
                      </p>
                      <SupervisorAccountIcon />
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      <Input
                        autoFocus={false}
                        placeholder={`Tilaka Name ${d('or')} Email`}
                        className="h-10 pl-3 w-full"
                        icon={<ContactIcon svgClassName="mt-2" />}
                      />
                      {row.signer.map((signer) => (
                        <div
                          key={signer.email}
                          className="rounded-md bg-[#F9F9F9] mt-3 px-3 py-2 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <p className="h-10 w-10 rounded-full bg-[#0D5FB31A] flex items-center justify-center font-semibold">
                              {'S'}
                            </p>
                            <div>
                              <h5>{signer.tilaka_name}</h5>
                              <p className="text-sm">{signer.email}</p>
                            </div>
                          </div>
                          <Badge
                            className={`w-fit flex-none px-1.5 ${
                              getBadgeLabelAndColor(signer.status, 'popover', d)
                                .color
                            }`}
                          >
                            {
                              getBadgeLabelAndColor(signer.status, 'popover', d)
                                .label
                            }
                          </Badge>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
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
                <div className="flex items-center gap-3">{t('date')} </div>
              </TableHead>
              <TableHead>{t('document')}</TableHead>
              <TableHead>{t('initiator')}</TableHead>
              <TableHead>{t('signer')}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{convertDateFormat(row.date)}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.initiator.email}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger className="flex gap-2 items-center">
                        <AccountCircleIcon svgClassName="h-5 w-5" />
                        <p className="font-semibold">{row.signer.length}</p>
                      </PopoverTrigger>
                      <PopoverContent className="w-96">
                        <Input
                          autoFocus={false}
                          placeholder={`Tilaka Name ${d('or')} Email`}
                          className="h-10 pl-3 w-full"
                          icon={<ContactIcon svgClassName="mt-2" />}
                        />
                        {row.signer.map((signer) => (
                          <div
                            key={signer.email}
                            className="rounded-md bg-[#F9F9F9] mt-3 px-3 py-2 flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <p className="h-10 w-10 rounded-full bg-[#0D5FB31A] flex items-center justify-center font-semibold">
                                {'S'}
                              </p>
                              <div>
                                <h5>{signer.tilaka_name}</h5>
                                <p className="text-sm">{signer.email}</p>
                              </div>
                            </div>
                            <Badge
                              className={`w-fit flex-none px-1.5 ${
                                getBadgeLabelAndColor(
                                  signer.status,
                                  'popover',
                                  d
                                ).color
                              }`}
                            >
                              {
                                getBadgeLabelAndColor(
                                  signer.status,
                                  'popover',
                                  d
                                ).label
                              }
                            </Badge>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
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
                    {row.status === 'on_progress' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="rounded-[10px] p-2"
                          align="end"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              toast.success('URL berhasil di-copy!')
                            }
                          >
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              toast.success('Pengingat berhasil dikirim!')
                            }
                          >
                            {t('sendReminder')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
