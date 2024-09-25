import React from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import Index from './wizard';

const Page = ({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: {};
}) => {
  const message = useMessages();
  return (
    <NextIntlClientProvider locale={params.locale} messages={message}>
      <Index />
    </NextIntlClientProvider>
  );
};

export default Page;
