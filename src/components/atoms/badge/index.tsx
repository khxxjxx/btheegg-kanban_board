import styled from 'styled-components';

interface BadgeProps {
  count: number;
  showZero?: boolean;
  children?: React.ReactNode;
}

const Badge = (props: BadgeProps) => {
  const { count, showZero = false, children } = props;

  if (!count && !showZero) return <></>;

  return (
    <StyledBadge className='badge-component'>
      {children}
      <span className={`badge ${children ? 'with-children' : ''}`}>
        <span className='text'>{count}</span>
      </span>
    </StyledBadge>
  );
};

const StyledBadge = styled.span`
  position: relative;
  display: inline-flex;

  & > .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    min-width: 22px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.color.black40};

    &.with-children {
      position: absolute;
      translate: 50% -50%;
      right: 0;
    }

    & > .text {
      font-size: 13px;
      color: ${({ theme }) => theme.color.black60};
      font-weight: bold;
    }
  }
`;

export default Badge;
