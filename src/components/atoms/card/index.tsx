import { forwardRef, HTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: DefaultTheme;
  height?: React.CSSProperties['height'];
  children: React.ReactNode;
}

const Card = forwardRef((props: CardProps & any, ref) => {
  const { className = '', theme, height, children, ...restProps } = props;

  return (
    <StyledCard
      ref={ref}
      className={`card-component ${className}`}
      theme={theme}
      height={height}
      {...restProps}
    >
      {children}
    </StyledCard>
  );
});

export const StyledCard = styled('div').withConfig({
  shouldForwardProp: (prop) => !['height'].includes(prop),
})<Pick<CardProps, 'height'>>`
  background-color: ${({ theme }) => theme.color.black0};
  width: 100%;
  height: ${({ height }) => height || 'auto'};
  padding: 20px 18px;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 #0000000f;
`;

export default Card;
