import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Flex, Icon, Text } from './components/atoms';
import styled from 'styled-components';
import { TaskList } from './components/molecules';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { groupState, projectNameState, taskState } from './store/atoms';
import { nanoid } from 'nanoid';
import _ from 'lodash';

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
    <Main>
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
          const tasks = taskList.filter((task) => task.groupId === group.id);

          return <TaskList key={group.id} taskInfo={{ ...group, tasks }} />;
        })}

        <CreateGroup />
      </Flex>
    </Main>
  );
}

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 24px;
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
