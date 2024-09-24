'use client';

import React from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const LanguageSwitcher = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const redirectPathname = pathname.split('/').slice(2).join('/');
    const locale = pathname.includes('/id/') ? 'en/' : 'id/';
    const params = useParams();

    // Create an object from searchParams
    const searchParamsObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    });

    // Merge useParams and searchParamsObj
    const allParams = { ...params, ...searchParamsObj };

    // Remove the 'locale' parameter
    const { locale: _, ...filteredParams } = allParams;

    // Create a query string from the filtered parameters
    const queryString = new URLSearchParams(filteredParams as any).toString();

    const href =
      '/' +
      locale +
      (redirectPathname || '') +
      (queryString ? '?' + queryString : '');

    const renderLink = (localeValue: string, label: string) => (
      <Link
        key={localeValue}
        href={href}
        className={cn('px-2 py-1 rounded-full text-white', {
          'bg-white text-primary': pathname.includes(`/${localeValue}`)
        })}
      >
        {label}
      </Link>
    );

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex items-center bg-primary rounded-full px-1 py-1 text-xs font-semibold',
          className
        )}
      >
        {renderLink('id', 'ID')}
        {renderLink('en', 'EN')}
      </div>
    );
  }
);

LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
