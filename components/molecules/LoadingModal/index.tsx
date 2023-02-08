import React, { useEffect, useState } from 'react';
import { FaGamepad, FaPlaystation, FaSteam, FaTwitch } from 'react-icons/fa';
import { LoadingModalProps } from './inerface';
import * as S from './styles';

const iconCompList = {
  0: <FaPlaystation />,
  1: <FaGamepad />,
  2: <FaSteam />,
  3: <FaTwitch />
};

/**
 * - 페이지 이동 시 보여주는 로딩 모달 입니다.
 * - 사용된 아이콘은 게임 사이트에 어울리도록 게임과 관련된 아이콘을 사용하였습니다.
 */
export const LoadingModal = ({ className }: LoadingModalProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // 아이콘
  useEffect(() => {
    let cnt = 0;
    let IconTimer = setInterval(() => {
      cnt = ++cnt;

      if (cnt === 4) cnt = 0;

      setCurrentIdx(cnt);
    }, 300);

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      clearInterval(IconTimer);
    };
  }, []);

  return (
    <S.LoadingModal state zIndex={1000} className={className} display='flex'>
      <p>{iconCompList[currentIdx]}</p>
    </S.LoadingModal>
  );
};
