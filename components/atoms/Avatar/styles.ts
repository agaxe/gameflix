import styled, { css } from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';
import { AvatarProps } from './interface';

const { COLOR_GRAY } = VAR_COLOR;

export const commonStyles = css`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;
export const Wrap = styled.div`
  ${commonStyles}
  border:1px solid ${COLOR_GRAY};
  background: ${COLOR_GRAY};
`;
export const Avatar = styled.div<AvatarProps>`
  ${commonStyles}
  background:url(${(props) => props.img}) center center no-repeat;
  background-size: cover;
`;
