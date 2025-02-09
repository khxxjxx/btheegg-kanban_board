import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { tagState } from '@/store/atoms';
import { Card, Flex, Tag, Text } from '@/components/atoms';
import EditTask from './edit';
import EmptyTask from './empty';

import { type ITask } from '@/types/task';

interface EditTaskProps {
  task: ITask;
  editMode: true;
  onFocus?: (task: ITask) => void;
  onSubmit: (task?: ITask) => void;
}

interface DefaultTaskProps {
  task: ITask;
  editMode?: false;
  onFocus?: (task: ITask) => void;
  onSubmit?: unknown;
}

type TaskProps = DefaultTaskProps | EditTaskProps;

const Task = (props: TaskProps) => {
  const { task, editMode, onFocus, onSubmit } = props;

  const tags = useRecoilValue(tagState);

  const tag = useMemo(
    () => tags.find((tag) => tag.id === task?.tagId),
    [task, tags],
  );

  if (editMode) return <EditTask task={task} onSubmit={onSubmit} />;

  return (
    <Card draggable data-taskid={task.id}>
      <Flex gap={14} vertical>
        {tag && <Tag color={tag.color}>{tag.name}</Tag>}
        <Text variant='text' onClick={() => onFocus?.(task)}>
          {task.name}
        </Text>
      </Flex>
    </Card>
  );
};

Task.Edit = EditTask;
Task.Empty = EmptyTask;

export default Task;
