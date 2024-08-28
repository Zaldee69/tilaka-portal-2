'use client';
import React, { useState } from 'react';
import CardFilter from './card-filter';
import {
  DonutIcon,
  ListIcon,
  SupervisorAccountIcon,
  UnpublishedIcon
} from '../../../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';

type Props = {};

const CardsFilter = (props: Props) => {
  const t = useTranslations('UserManagement.cardFilter');

  const [filter, setFilter] = useState<
    'all' | 'active' | 'on_process' | 'inactive'
  >('all');
  return (
    <div className="flex flex-wrap gap-3">
      <CardFilter
        filter={filter}
        setFilter={setFilter}
        value="all"
        amount="50"
        title={t('all')}
        Icon={ListIcon}
      />
      <CardFilter
        filter={filter}
        setFilter={setFilter}
        value="active"
        amount="20"
        title={t('active')}
        Icon={SupervisorAccountIcon}
      />
      <CardFilter
        filter={filter}
        setFilter={setFilter}
        value="on_process"
        amount="54"
        title={t('process')}
        Icon={DonutIcon}
      />
      <CardFilter
        filter={filter}
        setFilter={setFilter}
        value="inactive"
        amount="32"
        title={t('inactive')}
        Icon={UnpublishedIcon}
      />
    </div>
  );
};

export default CardsFilter;
