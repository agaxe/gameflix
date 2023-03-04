import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/atoms/Icon';
import { LogoProps } from './interafce';

export const Logo = ({ isLink = true }: LogoProps) => {
  function LogoImg() {
    return <Icon name='logo' />;
  }

  return (
    <div>
      {isLink ? (
        <Link href='/'>
          <LogoImg />
        </Link>
      ) : (
        <LogoImg />
      )}
    </div>
  );
};
