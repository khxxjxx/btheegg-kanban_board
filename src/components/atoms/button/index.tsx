import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ThemeType } from '@/styles/theme';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLInputElement>, 'color'> {
  color?: keyof ThemeType['color'];
  shape?: 'default' | 'circle' | 'round';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

const Button = (props: ButtonProps) => {
  const {
    color,
    shape = 'default',
    icon,
    iconPosition = 'start',
    children,
  } = props;

  const Icon = () => <span className='button-icon'>{icon}</span>;

  return (
    <StyledButton className={`button-component shape-${shape}`} color={color}>
      {iconPosition === 'start' && <Icon />}
      {children && <span className='text'>{children}</span>}
      {iconPosition === 'end' && <Icon />}
    </StyledButton>
  );
};

const StyledButton = styled('span').withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop),
})<Pick<ButtonProps, 'color'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 13px;
  height: 28px;
  padding: 0px 8px;
  background-color: ${({ theme }) => theme.color.black10};
  color: ${({ theme, color = 'black60' }) => theme.color[color]};
  cursor: pointer;

  &:hover {
    filter: brightness(95%);
  }

  & > .button-icon {
    display: flex;
    font-size: 14px;
    flex-shrink: 0;
  }

  &.shape-default {
    padding: 0px 8px;
    border-radius: 6px;
  }
  &.shape-round {
    padding: 0px 13px;
    border-radius: 30px;
  }
`;

export default Button;
