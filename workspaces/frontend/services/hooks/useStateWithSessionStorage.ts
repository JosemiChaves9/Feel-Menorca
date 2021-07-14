import { useState, useEffect } from "react";

export const useStateWithSessionStorage = (sessionStorageKey: string): [string, (state: string) => void] => {
  const [value, setValue] = useState(
    sessionStorage.getItem(sessionStorageKey) || ""
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, value);
  }, [value, sessionStorageKey]);

  return [value, setValue];
};
