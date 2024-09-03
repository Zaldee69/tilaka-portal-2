'use client';
import React, { useState } from 'react';
import DownloadButton from './download-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { parseCSV } from '@/lib/utils';
import UploadButton from './upload-button';
import { Button } from '@/components/ui/button';
import { SendIcon } from '../../../../../../../../public/icons/icons';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import Image from 'next/image';

type Props = {};

interface CSVFile {
  nama: string;
  email: string;
}

const AddBulkUser = (props: Props) => {
  const [csvFile, setcsvFile] = useState<CSVFile[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations('AddUser.addUserCard');
  const d = useTranslations('AddUser.addBulkUserCard');
  const m = useTranslations('AddUser.modal');

  const onUploadFileCSV = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].type !== 'text/csv') {
        toast.error('Tipe file harus CSV');
        return;
      }
      const file = event.target.files[0];
      const parsedData = await parseCSV(file);
      setcsvFile(parsedData as any);
      // Reset the file input
      event.target.value = '';
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3">
      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent className="max-w-md gap-7 pb-10">
          <AlertDialogHeader>
            <div className="gap-3 justify-center items-center flex flex-col px-5">
              {' '}
              <Image
                src="/images/user-reg-sent.svg"
                width={150}
                height={270}
                className="flex-none"
                alt="Document Sent"
              />
              <AlertDialogTitle className="flex justify-center items-center gap-3">
                {m('title')}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center whitespace-pre-line">
                {m('text')}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="!justify-center items-center">
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isLoading}>
        <DialogContent
          showCloseIcon={false}
          className="bg-transparent flex items-center justify-center border-none shadow-none"
        >
          <div className="w-[100px] p-0 h-[100px] !rounded-full flex items-center justify-center bg-white relative">
            <Image
              className="animate-spin"
              src="/images/ellipse.svg"
              height={73}
              width={73}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
            <Image
              src="/images/tilaka.svg"
              className="absolute"
              height={35}
              width={33}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex gap-3">
        <DownloadButton />
        <UploadButton onUploadFileCSV={onUploadFileCSV} />
      </div>
      {csvFile?.length > 0 && (
        <>
          <Table className="mt-4 border rounded-md">
            <TableHeader>
              <TableRow>
                {Object.keys(csvFile[0]).map((header, index) => (
                  <TableHead className="border" key={index}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvFile.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="border">{row.nama}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-3 justify-end mt-3">
            <Button
              className="w-fit font-semibold gap-2 px-6 bg-white text-admin-primary hover:!bg-white"
              size="lg"
              type="button"
              onClick={() => setcsvFile([])}
            >
              {d('delete')}
            </Button>
            <Button
              onClick={onSubmit}
              className="w-fit font-semibold gap-2 px-6 admin-custom-shadow"
              size="lg"
              type="submit"
            >
              <SendIcon pathClassName="fill-white" /> {t('submit')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddBulkUser;
