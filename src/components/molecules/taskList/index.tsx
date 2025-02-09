import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { nanoid } from 'nanoid';
import { groupState, taskState } from '@/store/atoms';
import { Badge, Button, Flex, Icon, Text } from '@/components/atoms';
import Task from '../task';

import { type ITask } from '@/types/task';
import { type IGroup } from '@/types/group';

type TTask = ITask & { editMode?: 'create' | 'update' };

const TaskList = (props: { taskInfo: IGroup & { tasks: ITask[] } }) => {
  const { id, name, lock, tasks } = props.taskInfo;

  const [tempGroupName, setTempGroupName] = useState(name);
  const [tempTaskList, setTempTaskList] = useState<TTask[]>(tasks);

  const setGroupList = useSetRecoilState(groupState);
  const setTaskList = useSetRecoilState(taskState);

  function addTask(groupId: string) {
    const task: TTask = {
      id: nanoid(16),
      groupId,
      name: '',
      editMode: 'create',
    };

    setTempTaskList((current) => [...current, task]);
  }

  useEffect(() => {
    setTempTaskList(tasks);
  }, [tasks]);

  return (
    <Flex vertical gap={14} flex='0 0 201px'>
      <Flex align='center' justify='space-between' flex='0 0 28px'>
        <Flex align='center' gap={8}>
          <Text
            variant='label'
            contentEditable={!lock}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              const value = target.textContent;
              if (!value) return;

              setTempGroupName(value);
            }}
            onBlur={() =>
              setGroupList((current) =>
                current.map((group) => {
                  if (group.id === id) return { ...group, name: tempGroupName };
                  return group;
                }),
              )
            }
          >
            {name}
          </Text>
          <Badge count={tasks.length} />
        </Flex>
        <Flex gap={8} align='center'>
          {tasks.length ? (
            <Button
              size='sm'
              icon={<Icon type='plus' />}
              shape='round'
              onClick={() => addTask(id)}
            />
          ) : (
            <></>
          )}

          {!lock && (
            <Button
              shape='circle'
              color='black50'
              bgColor='black30'
              icon={<Icon type='close' />}
            />
          )}
        </Flex>
      </Flex>
      {tempTaskList.length ? (
        <Flex gap={14} vertical data-groupid={id}>
          {tempTaskList.map((task) => (
            <Task
              key={task.id}
              task={task}
              editMode={Boolean(task.editMode)}
              onFocus={({ id }) => {
                setTempTaskList((current) =>
                  current.map((task) => ({
                    ...task,
                    editMode: task.id === id ? 'update' : undefined,
                  })),
                );
              }}
              onSubmit={(task) => {
                if (!task) return;

                const _task = task as TTask;
                const editMode = _task.editMode;
                delete _task.editMode;

                switch (editMode) {
                  case 'create': {
                    return setTaskList((current) => [...current, _task]);
                  }
                  case 'update': {
                    return setTaskList((current) =>
                      current.map((task) =>
                        task.id === _task.id ? _task : task,
                      ),
                    );
                  }
                }
              }}
            />
          ))}
        </Flex>
      ) : (
        <Task.Empty addTask={() => addTask(id)} />
      )}
    </Flex>
  );
};

export default TaskList;
