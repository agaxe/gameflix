import { HTMLAttributes } from 'react';

export interface SearchInputProps extends HTMLAttributes<HTMLDivElement> {
  handleSearch?: (word: string) => void;
}
