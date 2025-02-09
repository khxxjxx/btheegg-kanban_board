import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ThemeType } from '@/styles/theme';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLInputElement>, 'color'> {
  size?: 'sm' | 'md' | 'lg';
  color?: keyof ThemeType['color'];
  bgColor?: keyof ThemeType['color'];
  shape?: 'default' | 'circle' | 'round';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

const Button = (props: ButtonProps) => {
  const {
    className = '',
    size = 'md',
    color,
    shape = 'default',
    icon,
    iconPosition = 'start',
    children,
    ...restProps
  } = props;

  const Icon = () => <span className='button-icon'>{icon}</span>;

  return (
    <StyledButton
      className={`button-component shape-${shape} ${className}`}
      size={size}
      color={color}
      {...restProps}
    >
      {iconPosition === 'start' && <Icon />}
      {children && <span className='text'>{children}</span>}
      {iconPosition === 'end' && <Icon />}
    </StyledButton>
  );
};

const StyledButton = styled('span').withConfig({
  shouldForwardProp: (prop) => !['size', 'color', 'bgColor'].includes(prop),
})<Pick<ButtonProps, 'size' | 'color' | 'bgColor'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 13px;
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '24px';
      case 'md':
        return '28px';
      case 'lg':
        return '32px';
    }
  }};
  padding: 0px 8px;
  background-color: ${({ theme, bgColor = 'black10' }) => theme.color[bgColor]};
  color: ${({ theme, color = 'black60' }) => theme.color[color]};
  cursor: pointer;

  &:hover {
    filter: brightness(95%);
  }

  & > .text {
    white-space: pre;
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
  &.shape-circle {
    padding: 0px 8px;
    border-radius: 100%;
  }
  &.shape-round {
    padding: 0px 13px;
    border-radius: 30px;
  }
`;

export default Button;
