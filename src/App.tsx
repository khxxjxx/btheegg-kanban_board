import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { groupState, projectNameState, taskState } from './store/atoms';
import { Button, Flex, Icon, Text } from './components/atoms';
import { TaskList } from './components/molecules';
import Header from './components/molecules/header';

function App() {
  const [projectName, setProjectName] = useRecoilState(projectNameState);
  const [tempProjectName, setTempProjectName] = useState(projectName);

  const dragRef = useRef<HTMLDivElement>(null);

  const [groupList] = useRecoilState(groupState);
  const [taskList, setTaskList] = useRecoilState(taskState);

  const dragStart = async (e: React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    e.dataTransfer.effectAllowed = 'move';

    const taskId = target.dataset.taskid;
    const groupId = target.parentElement?.dataset.groupid;

    const targetIndex = taskList.findIndex(
      (task) => task.id === taskId && task.groupId && groupId,
    );

    function dragover(e: DragEvent) {
      e.preventDefault();
    }

    function drop(e: DragEvent) {
      const target = e.target as HTMLElement;
      const dropEl = target.closest('[data-groupid]') as HTMLElement;
      const childElement = dropEl.lastElementChild as HTMLElement;

      const dropGroupId = dropEl.dataset.groupid;
      const dropTaskId = childElement?.dataset.taskid;

      if (!dropTaskId || !dropGroupId) return;

      const dropIndex = taskList.findIndex(
        (task) => task.id === dropTaskId && task.groupId && dropGroupId,
      );

      const _taskList = _.cloneDeep(taskList);
      let temp = _taskList[targetIndex];
      temp.groupId = dropGroupId;
      _taskList[targetIndex] = _taskList[dropIndex];
      _taskList[dropIndex] = temp;

      setTaskList(_taskList);

      dragRef.current?.removeEventListener('dragover', dragover);
      dragRef.current?.removeEventListener('drop', drop);
    }

    dragRef.current?.addEventListener('dragover', dragover);
    dragRef.current?.addEventListener('drop', drop);
  };

  useEffect(() => {
    setTempProjectName(projectName);
  }, [projectName]);

  return (
    <Layout>
      <Header userInfo={{ name: '김희진' }} />
      <Main>
        <Content>
          <div>
            <Title>
              <Text
                variant='title'
                contentEditable
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  const value = target.textContent;
                  if (!value) return;

                  setTempProjectName(value);
                }}
                onBlur={() => setProjectName(tempProjectName)}
              >
                {projectName}
              </Text>
            </Title>
            <Flex ref={dragRef} gap={20} onDragStart={dragStart}>
              {groupList.map((group) => {
                const tasks = taskList.filter(
                  (task) => task.groupId === group.id,
                );

                return (
                  <TaskList key={group.id} taskInfo={{ ...group, tasks }} />
                );
              })}

              <CreateGroup />
            </Flex>
          </div>
        </Content>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  padding-top: 88px;
  width: 100%;
  height: 100vh;
  min-width: 100%;
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 64px 100px;
  overflow-y: auto;
`;

const CreateGroup = () => {
  const [createMode, setCreateMode] = useState(false);

  const setGroupList = useSetRecoilState(groupState);

  const ref = useRef<HTMLInputElement>(null);

  function addGroup(name?: string) {
    if (!name) return;

    const newGroup = {
      id: nanoid(16),
      name,
    };

    setGroupList((current) => [...current, newGroup]);
    setCreateMode(false);
  }

  useEffect(() => {
    createMode && ref.current?.focus();
  }, [createMode]);

  return (
    <>
      {createMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const target = e.target as { groupName?: { value: string } };
            addGroup(target.groupName?.value);
          }}
        >
          <input
            ref={ref}
            name='groupName'
            placeholder='List name...'
            autoComplete='off'
            onBlur={(e) => addGroup(e.target.value)}
          />
        </form>
      ) : (
        <Button
          color='black50'
          icon={<Icon type='plus' />}
          onClick={() => setCreateMode(true)}
        >
          Add another list
        </Button>
      )}
    </>
  );
};

const Title = styled.div`
  padding-bottom: 40px;
`;
export default App;
