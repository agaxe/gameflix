import React, { useState } from 'react';
import { DetailNoGameInfoTitle } from '@/components/molecules/Detail/NoGameInfoTitle';
import * as S from './styles';

interface DatailSummaryProps {
  summary: string;
}

export const DetailSummary = ({ summary = '' }: DatailSummaryProps) => {
  const [summaryMore, setSummaryMore] = useState(false);

  const Summary = () => {
    const shortSummary = summary.slice(0, 200);
    const isDeactiveSummary = summary.length > shortSummary.length;

    if (!summaryMore && isDeactiveSummary) {
      return (
        <>
          <p>{shortSummary}...</p>
          <span onClick={() => setSummaryMore(true)}>more</span>
        </>
      );
    }

    return <p>{summary}</p>;
  };

  return (
    <S.DetailSummary summaryMore={summaryMore}>
      {!summary?.length ? <DetailNoGameInfoTitle type='설명' /> : <Summary />}
    </S.DetailSummary>
  );
};
