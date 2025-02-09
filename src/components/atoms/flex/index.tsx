import { forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  wrap?: boolean;
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: number;
  children: React.ReactNode;
}

const Flex = forwardRef((props: FlexProps & any, ref) => {
  const {
    className = '',
    children,
    vertical = false,
    wrap = false,
    justify = 'normal',
    align = 'normal',
    flex = 'none',
    gap = 0,
    ...restProps
  } = props;

  return (
    <StyledFlex
      ref={ref}
      className={`flex-component ${className}`}
      {...{ vertical, wrap, justify, align, flex, gap }}
      {...restProps}
    >
      {children}
    </StyledFlex>
  );
});

const StyledFlex = styled('div').withConfig({
  shouldForwardProp: (prop) =>
    !['vertical', 'wrap', 'justify', 'align', 'flex', 'gap'].includes(prop),
})<Pick<FlexProps, 'vertical' | 'wrap' | 'justify' | 'align' | 'flex' | 'gap'>>`
  display: flex;
  height: 100%;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex: ${({ flex }) => flex};
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap}px` : gap)};
`;

export default Flex;
