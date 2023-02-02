import React from 'react';
import Link from 'next/link';

// * type
type LogoProps = {
  /** 링크의 유무 */
  link: boolean;
};

// * component
function LogoComp({ link }: LogoProps) {
  // 로고
  function Logo() {
    return (
      <img
        src='/static/images/logo.svg'
        alt='logo'
        css={{ background: 'none' }}
      />
    );
  }

  return (
    <div>
      {link ? (
        <Link href='/'>
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}
    </div>
  );
}
export default LogoComp;

// * defaultProps
LogoComp.defaultProps = {
  link: true
};
