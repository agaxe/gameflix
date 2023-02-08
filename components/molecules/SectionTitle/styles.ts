import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY } = VAR_COLOR;

export const SectionTitle = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 26px;
    background: ${COLOR_PRIMARY};
    margin-right: 10px;
  }
`;
