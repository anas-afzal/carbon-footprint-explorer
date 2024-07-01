'use client';

import { useEffect, useState } from 'react';
import { isRight } from '@/utils';
import { tryCatch } from '@/utils/task';
import type { UseLocalStorage } from './types';

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorage<T> => {
  const get = (): T => {
    const value = window.localStorage.getItem(key);

    if (value) {
      const parsedValue = tryCatch(
        () => JSON.parse(value) as T,
        () => {
          console.error('Error parsing local storage value');
        },
      );

      if (isRight(parsedValue)) return parsedValue.value;
    }

    return initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const value = get();
    setStoredValue(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (value: T): void => {
    tryCatch(
      () => {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      },
      () => {
        console.error('Error setting local storage value');
      },
    );
  };

  return [storedValue, set] as const;
};
