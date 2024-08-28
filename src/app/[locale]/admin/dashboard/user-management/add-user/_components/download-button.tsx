'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { DownloadIcon } from '../../../../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';

type Props = {};

const DownloadButton = (props: Props) => {
  const t = useTranslations('AddUser.addBulkUserCard');

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const fileUrl = '/format_batch_upload.csv'; // Ensure this matches the file path in the public directory
    const filename = 'format_batch_upload.csv';
    downloadFile(fileUrl, filename);
  };

  return (
    <Button
      onClick={handleDownload}
      className="w-fit font-semibold gap-2 md:px-6 px-2.5 bg-white text-admin-primary hover:!bg-white"
      size="lg"
      type="button"
    >
      <DownloadIcon pathClassName="fill-admin-primary" /> {t('downloadFormat')}
    </Button>
  );
};

export default DownloadButton;
