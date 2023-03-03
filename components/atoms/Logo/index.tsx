import React from 'react';
import Link from 'next/link';
import { LogoProps } from './interafce';

export const Logo = ({ isLink = true }: LogoProps) => {
  function LogoImg() {
    return (
      <img
        src='/static/images/logo.svg'
        alt='logo'
        style={{ background: 'none' }}
      />
    );
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
