import styled from 'styled-components';
import { Item } from '@/components/atoms/Item';
import { List } from '@/components/atoms/List';
import { pxToRem } from '@/static/styles/common';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_WHITE, COLOR_LINE_GRAY, COLOR_GRAY } = VAR_COLOR;

const commonStyles = {
  border: `1px solid ${COLOR_LINE_GRAY}`,
  padding: '10px'
};

export const Select = styled.div<{ width: string }>`
  background: ${COLOR_WHITE};
  width: ${(props) => props.width};
  color: #666;
  cursor: default;
  font-size: ${pxToRem(14)};
  user-select: none;
  position: absolute;
  z-index: 50;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid transparent;
  transition: border 0.3s;

  ${commonStyles.padding}
  &:hover {
    ${commonStyles.border}
  }
  svg {
    margin-left: 5px;
    font-size: 20px;
  }
`;
export const SelectList = styled(List)`
  margin-top: -1px;

  ${commonStyles.border}
  box-sizing:border-box;
`;
export const SelectItem = styled(Item)`
  ${commonStyles.padding}
  &:hover {
    background: ${COLOR_GRAY};
  }
`;
