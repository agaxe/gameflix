import styled from 'styled-components';
import { VAR_COLOR, VAR_SIZE } from '@/static/styles/variable';

const { COLOR_PRIMARY } = VAR_COLOR;

export const DetailSummary = styled.div<{ summaryMore: boolean }>`
  & > p {
    font-weight: 300;
    line-height: 200.8%;
    vertical-align: top;
    white-space: ${(props) => (props.summaryMore ? 'pre-wrap' : 'normal')};
  }
  & > span {
    display: block;
    color: ${COLOR_PRIMARY};
    font-weight: 400;
    margin-top: 15px;
    cursor: pointer;
  }
`;
