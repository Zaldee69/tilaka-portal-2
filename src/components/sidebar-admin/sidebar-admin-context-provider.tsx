'use client';

import { Dispatch, SetStateAction, createContext } from 'react';
import { useMemo, useState } from 'react';

type TinitialState = {
  isOpen: boolean;
};

export type TcontextValue = {
  callbacks?: { [key: string | number]: () => void }; // functions that wrapped by useCallback
  state: TinitialState; // main state of context
  stateSetter: Dispatch<SetStateAction<TinitialState>>; // main stateSetter of context
};

const initialState: TinitialState = { isOpen: true };

const contextValueDefault: TcontextValue = {
  state: { isOpen: true },
  stateSetter: () => true
};

export const SidebarAdminContext = createContext(contextValueDefault);

type Props = { children: React.ReactNode | JSX.Element };

export const SidebarAdminContextProvider = (props: Props) => {
  const [state, stateSetter] = useState(initialState);

  const memoizedValue = useMemo(
    (): TcontextValue => ({ callbacks: {}, state, stateSetter }),
    [state]
  );

  return (
    <SidebarAdminContext.Provider value={memoizedValue}>
      {props.children}
    </SidebarAdminContext.Provider>
  );
};
