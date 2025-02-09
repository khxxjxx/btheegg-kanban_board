import styled from 'styled-components';
import { Flex, Icon, Logo, Text } from '@/components/atoms';

const Header = (props: any) => {
  const { userInfo } = props;

  return (
    <StyledHeader className='header-component'>
      <div className='header'>
        <Logo />
        <Flex className='profile' align='center' gap={12}>
          <img src='/avatar.png' alt='아바타' />
          <Flex align='center' gap={20}>
            <Text variant='text'>{userInfo.name}</Text>
            <Icon type='arrowDown' />
          </Flex>
        </Flex>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0px 40px;
  background-color: ${({ theme }) => theme.color.black0};
  z-index: 999;

  & > .header {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    align-items: center;
  }
`;

export default Header;
