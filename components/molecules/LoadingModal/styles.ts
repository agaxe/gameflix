import styled from 'styled-components';
import { ModalBg } from '@/components/atoms/ModalBg';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY } = VAR_COLOR;

// * style
export const LoadingModal = styled(ModalBg)`
  align-items: center;
  justify-content: center;
  p {
    color: ${COLOR_PRIMARY};
    font-size: 50px;
  }
`;
