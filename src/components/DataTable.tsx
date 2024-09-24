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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  AccountCircleIcon,
  CancelScheduleIcon,
  ContactIcon,
  PermIdentityIcon,
  SupervisorAccountIcon
} from '../../public/icons/icons';
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
import Pagination from './Pagination';
import { Document } from '@/app/[locale]/dashboard/documents/page';
import { Link } from '@/navigation';

const RejectConfirmationModal = ({
  isOpen,
  setIsOpen,
  d
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  d: (key: string) => string;
}) => {
  const [charCount, setCharCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setInputValue(e.target.value);
      setCharCount(e.target.value.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex items-center">
          <div className="bg-red-600/10 w-fit p-3 rounded-2xl">
            <CancelScheduleIcon />
          </div>
          <DialogDescription className="text-center text-black">
            <h4 className="mb-1 mt-4"> {d('table.cancelDialog.title')}</h4>
          </DialogDescription>
          <div className="relative w-full flex justify-center">
            <Textarea
              placeholder={d('table.cancelDialog.placeholderInputReason')}
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
              maxLength={200}
              className="w-[95%] border-gray-400 resize-none p-3 my-4"
              rows={2}
            />
            <div className="absolute bottom-5 right-[5%] text-gray-500 text-sm">
              ({charCount}/200)
            </div>
          </div>
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
};

const DenyConfirmationModal = ({
  isOpen,
  setIsOpen,
  d
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  d: (key: string) => string;
}) => {
  const [charCount, setCharCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setInputValue(e.target.value);
      setCharCount(e.target.value.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex items-center">
          <div className="bg-yellow-600/10 w-fit p-3 rounded-2xl">
            <CancelScheduleIcon />
          </div>
          <DialogDescription className="text-center text-black">
            <h4 className="mb-1 mt-4">{d('table.denyDialog.title')}</h4>
          </DialogDescription>
          <div className="relative w-full flex justify-center">
            <Textarea
              placeholder={d('table.denyDialog.placeholderInputReason')}
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
              maxLength={200}
              className="w-[95%] border-gray-400 resize-none p-3 my-4"
              rows={2}
            />
            <div className="absolute bottom-5 right-[5%] text-gray-500 text-sm">
              ({charCount}/200)
            </div>
          </div>
          <DialogFooter className="gap-3 justify-center">
            <Button
              onClick={() => setIsOpen(false)}
              variant="secondary"
              className="bg-white modal-button-shadow px-14 font-semibold"
            >
              {d('table.denyDialog.cancelButton')}
            </Button>
            <Button variant="destructive" className="font-semibold px-14">
              {d('table.denyDialog.confirmButton')}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

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
  const d = useTranslations('Dashboard');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDenyOpen, setIsDenyOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPerPage, setContentPerPage] = useState<number>(5);

  return (
    <div>
      <RejectConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} d={d} />
      <DenyConfirmationModal
        isOpen={isDenyOpen}
        setIsOpen={setIsDenyOpen}
        d={d}
      />

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
                  {actions ? (
                    actions
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-[10px] p-2"
                        align="end"
                      >
                        {row.status !== 'denied' && (
                          <>
                            <Link href="/dashboard/documents/detail">
                              <DropdownMenuItem>
                                {d('table.actions.view')}
                              </DropdownMenuItem>
                            </Link>
                            {row.status !== 'done' && (
                              <DropdownMenuItem>
                                {d('table.actions.sign')}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            {row.initiator.email === 'wahab1@gmail.com' ? (
                              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                {d('table.actions.cancel')}
                              </DropdownMenuItem>
                            ) : (
                              row.status !== 'done' && (
                                <DropdownMenuItem
                                  onClick={() => setIsDenyOpen(true)}
                                >
                                  {d('table.actions.deny')}
                                </DropdownMenuItem>
                              )
                            )}
                          </>
                        )}
                        <Link href="/dashboard/documents/audit-trail">
                          <DropdownMenuItem>Audit Trail</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

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
                        placeholder={`Tilaka Name ${d('table.or')} Email`}
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
                <div className="flex items-center gap-2">
                  {d('table.date')}{' '}
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
              <TableHead>{d('table.document')}</TableHead>
              <TableHead>{d('table.initiator')}</TableHead>
              <TableHead>{d('table.signer')}</TableHead>
              <TableHead>{d('table.status')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.date}</TableCell>
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
                          placeholder={`Tilaka Name ${d('table.or')} Email`}
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
                    {actions ? (
                      actions
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="rounded-[10px] p-2"
                          align="end"
                        >
                          {row.status !== 'denied' && (
                            <>
                              <Link href="/dashboard/documents/detail">
                                <DropdownMenuItem>
                                  {d('table.actions.view')}
                                </DropdownMenuItem>
                              </Link>
                              {row.status !== 'done' && (
                                <DropdownMenuItem>
                                  {d('table.actions.sign')}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              {row.initiator.email === 'wahab1@gmail.com' ? (
                                <DropdownMenuItem
                                  onClick={() => setIsOpen(true)}
                                >
                                  {d('table.actions.cancel')}
                                </DropdownMenuItem>
                              ) : (
                                row.status !== 'done' && (
                                  <DropdownMenuItem
                                    onClick={() => setIsDenyOpen(true)}
                                  >
                                    {d('table.actions.deny')}
                                  </DropdownMenuItem>
                                )
                              )}
                            </>
                          )}
                          <Link
                            className="cursor-pointer"
                            href="/dashboard/documents/audit-trail"
                          >
                            <DropdownMenuItem className="!cursor-pointer">
                              Audit Trail
                            </DropdownMenuItem>
                          </Link>
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
