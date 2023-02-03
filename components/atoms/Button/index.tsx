import { ButtonProps } from './interface';
import * as S from './styles';

export const Button = ({
  children,
  theme = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <S.Button theme={theme} {...rest}>
      {children}
    </S.Button>
  );
};
