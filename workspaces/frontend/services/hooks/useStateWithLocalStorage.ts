import { useState, useEffect } from "react";

export const useStateWithLocalStorage = (
  localStorageKey: string
): [string, (state: string) => void] => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};
