import { Fragment, useState } from 'react';
import { Badge, Button, Card, Flex, Icon, Tag, Text } from './components/atoms';
import styled from 'styled-components';
import { StyledCard } from './components/atoms/card';

function App() {
  const [projectName, setProjectName] = useState('Project No.1');

  const [list, setList] = useState([
    { id: '1', name: '시작 전' },
    { id: '2', name: '진행 중' },
    { id: '3', name: '완료' },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      groupId: '2',
      tag: { name: '관리자페이지', color: 'blue' },
      name: '회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.',
    },
  ]);

  return (
    <>
      <Title>
        <Text variant='title'>{projectName}</Text>
      </Title>
      <Flex gap={20}>
        {list.map((item) => {
          const currentTaskList = tasks.filter(
            (task) => task.groupId === item.id,
          );
          const taskCount = currentTaskList.length;

          return (
            <Flex key={item.id} vertical gap={14} flex='0 0 201px'>
              <Flex align='center' justify='space-between' flex='0 0 28px'>
                <Flex align='center' gap={8}>
                  <Text variant='label'>{item.name}</Text>
                  <Badge count={taskCount} />
                </Flex>
                {taskCount ? (
                  <Button icon={<Icon type='plus' />} shape='round' />
                ) : (
                  <></>
                )}
              </Flex>
              <TaskList taskList={currentTaskList} />
            </Flex>
          );
        })}
        <Button color='black50' icon={<Icon type='plus' />}>
          Add another list
        </Button>
      </Flex>
    </>
  );
}

const TaskList = (props: any) => {
  const { taskList = [] } = props;

  if (!taskList.length) {
    return (
      <Card theme={{ color: { black0: '#ffffff66' } }} height='112px'>
        <Flex align='center' justify='center' gap={13} vertical>
          <Text variant='description'>지금 바로 추가해보세요.</Text>
          <Button icon={<Icon type='plus' />} shape='round' />
        </Flex>
      </Card>
    );
  }

  return (
    <Flex gap={14} vertical>
      {taskList.map((task: any) => (
        <Card key={task.id} draggable>
          <Flex gap={14} vertical>
            {task.tag && <Tag color={task.tag.color}>{task.tag.name}</Tag>}
            <Text variant='text'>{task.name}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

const Title = styled.div`
  padding-bottom: 40px;
`;
export default App;
