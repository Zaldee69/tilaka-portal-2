import { NextIntlClientProvider, useMessages } from 'next-intl';

const DashboarLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default DashboarLayout;
