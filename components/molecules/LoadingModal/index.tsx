import React, { useEffect, useState } from 'react';
import { FaGamepad, FaPlaystation, FaSteam, FaTwitch } from 'react-icons/fa';
import styled from 'styled-components';
import { ModalBg } from '@/components/atoms/ModalBg';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY } = VAR_COLOR;

// * type
type LoadingModalProps = {
  className?: string;
};

// * component
/**
 * - 페이지 이동 시 보여주는 로딩 모달 입니다.
 * - 사용된 아이콘은 게임 사이트에 어울리도록 게임과 관련된 아이콘을 사용하였습니다.
 */
function LoadingModalComp({ className }: LoadingModalProps) {
  const [Index, setIndex] = useState(0);

  // 아이콘
  useEffect(() => {
    let cnt = 0;
    let IconTimer = setInterval(() => {
      cnt = ++cnt;
      cnt === 4 ? (cnt = 0) : null;
      setIndex(cnt);
    }, 300);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      clearInterval(IconTimer);
    };
  }, []);

  return (
    <LoadingModal state zIndex={1000} className={className} display='flex'>
      {Index === 0 && (
        <p>
          <FaPlaystation />
        </p>
      )}
      {Index === 1 && (
        <p>
          <FaGamepad />
        </p>
      )}
      {Index === 2 && (
        <p>
          <FaSteam />
        </p>
      )}
      {Index === 3 && (
        <p>
          <FaTwitch />
        </p>
      )}
    </LoadingModal>
  );
}
export default LoadingModalComp;

// * style
const LoadingModal = styled(ModalBg)`
  align-items: center;
  justify-content: center;
  p {
    color: ${COLOR_PRIMARY};
    font-size: 50px;
  }
`;
