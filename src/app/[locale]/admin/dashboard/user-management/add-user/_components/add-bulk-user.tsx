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

type Props = {};

interface CSVFile {
  nama: string;
  email: string;
}

const AddBulkUser = (props: Props) => {
  const [csvFile, setcsvFile] = useState<CSVFile[] | []>([]);

  const t = useTranslations('AddUser.addUserCard');
  const d = useTranslations('AddUser.addBulkUserCard');

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

  return (
    <div className="flex flex-col gap-3">
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
              className="w-fit bg-admin-primary font-semibold gap-2 px-6 admin-custom-shadow"
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
