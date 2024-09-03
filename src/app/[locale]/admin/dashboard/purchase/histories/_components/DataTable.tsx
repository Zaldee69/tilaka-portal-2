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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import Pagination from '@/components/Pagination';
import { CancelScheduleIcon } from '../../../../../../../../public/icons/icons';
import { Package } from '../page';

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
    case 'waiting_for_payment':
      badgeProps.color = 'bg-[#FFB951]';
      badgeProps.label = d('status.waitingForPayment');
      break;
    case 'success':
      badgeProps.color = 'bg-[#3B9B1B]';
      badgeProps.label = d('status.success');
      break;
    case 'cancel':
      badgeProps.color = 'bg-[#BD0505]';
      badgeProps.label = d('status.cancel');
      break;

    default:
      break;
  }

  return { color: badgeProps.color, label: badgeProps.label };
};

const DataTable = ({
  data,
  showPagination = false
}: {
  data: Package[];
  showPagination?: boolean;
}) => {
  const d = useTranslations('PurchaseHistory');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPerPage, setContentPerPage] = useState<number>(5);

  const locale = useLocale();

  console.log(locale);

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
                  <h5>
                    {locale === 'en' ? (
                      <>
                        {row.name} {d('signature')}
                      </>
                    ) : (
                      <>
                        {d('signature')} {row.name}
                      </>
                    )}
                  </h5>
                  <p className="text-xs">{row.date}</p>
                  <p className="text-xs">{row.price}</p>
                  <p className="text-xs">{row.totalPrice}</p>
                </div>
              </div>
            ))
          : 'nothing'}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-1">
              <TableHead>
                <div className="flex items-center gap-2">
                  {d('date')}{' '}
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
              <TableHead>{d('packageName')}</TableHead>
              <TableHead>{d('price')}</TableHead>
              <TableHead>{d('totalPrice')}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    {locale === 'en' ? (
                      <>
                        {row.name} {d('signature')}
                      </>
                    ) : (
                      <>
                        {d('signature')} {row.name}
                      </>
                    )}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.totalPrice}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-fit text-nowrap px-1.5 ${
                        getBadgeLabelAndColor(row.status, 'row', d).color
                      }`}
                    >
                      {getBadgeLabelAndColor(row.status, 'row', d).label}
                    </Badge>
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
