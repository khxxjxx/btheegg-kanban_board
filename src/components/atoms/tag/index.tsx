import styled from 'styled-components';

interface TagProps {
  color?:
    | 'purple'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'magenta'
    | 'pink'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'volcano'
    | 'geekblue'
    | 'gold'
    | 'lime';
  children: React.ReactNode;
}

const Tag = (props: TagProps) => {
  const { color, children } = props;

  return (
    <StyledTag className='tag-component' color={color}>
      {children}
    </StyledTag>
  );
};

const StyledTag = styled('span').withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop),
})<Pick<TagProps, 'color'>>`
  display: inline-flex;
  align-items: center;
  height: 24px;
  width: fit-content;
  border-radius: 4px;
  padding: 0 8px;
  background-color: ${({ theme, color }) =>
    color ? theme.color[`${color}10`] : theme.color.black20};
  color: ${({ theme, color }) =>
    color ? theme.color[`${color}70`] : theme.color.black60};
`;

export default Tag;
