import { useCallback, useState } from 'react';

export const useInput = (initialState) => {
  const [InputVal, setInputVal] = useState(initialState);

  const InputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInputVal({
        ...InputVal,
        [name]: value
      });
    },
    [InputVal]
  );

  return [InputVal, InputChange];
};
