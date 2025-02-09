import styled, { css } from 'styled-components';
import { ThemeType } from '@/styles/theme';
import { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  component?: React.ElementType;
  variant?: 'title' | 'label' | 'text' | 'description';
  size?: React.CSSProperties['fontSize'];
  color?: keyof ThemeType['color'];
  weight?: React.CSSProperties['fontWeight'];
  contentEditable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Text = (props: TextProps) => {
  const { component = 'span', children, ...restProps } = props;

  return (
    <StyledText
      className='text-component'
      as={component}
      suppressContentEditableWarning
      {...restProps}
    >
      {children}
    </StyledText>
  );
};

const StyledText = styled('span').withConfig({
  shouldForwardProp: (prop) =>
    !['variant', 'size', 'color', 'weight'].includes(prop),
})<Omit<TextProps, 'component' | 'children'>>`
  line-height: 120%;

  ${({ variant }) => {
    switch (variant) {
      case 'title':
        return css`
          font-size: 24px;
          font-weight: bold;
          color: ${({ theme }) => theme.color.black80};
          line-height: 142%;
        `;
      case 'label':
        return css`
          font-size: 18px;
          font-weight: bold;
          color: ${({ theme }) => theme.color.black70};
        `;
      case 'text':
        return css`
          font-size: 14px;
          color: ${({ theme }) => theme.color.black100};
        `;
      case 'description':
        return css`
          font-size: 12px;
          color: ${({ theme }) => theme.color.black50};
        `;
    }
  }}

  ${({ theme, color }) => color && `color: ${theme.color[color]}`};
  ${({ size }) => size && `font-size: ${size}`};
  ${({ weight }) => weight && `font-weight: ${weight}`};
`;

export default Text;
