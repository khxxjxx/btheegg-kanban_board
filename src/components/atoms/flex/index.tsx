import styled from 'styled-components';

interface FlexProps {
  vertical?: boolean;
  wrap?: boolean;
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: number;
  children: React.ReactNode;
}

const Flex = (props: FlexProps) => {
  const {
    children,
    vertical = false,
    wrap = false,
    justify = 'normal',
    align = 'normal',
    flex = 'none',
    gap = 0,
  } = props;

  return (
    <StyledFlex
      className='flex-component'
      {...{ vertical, wrap, justify, align, flex, gap }}
    >
      {children}
    </StyledFlex>
  );
};

const StyledFlex = styled('div').withConfig({
  shouldForwardProp: (prop) =>
    !['vertical', 'wrap', 'justify', 'align', 'flex', 'gap'].includes(prop),
})<Omit<FlexProps, 'children'>>`
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
