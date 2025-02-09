import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks';
import { Card, Flex } from '@/components/atoms';
import TagSelect from './TagSelect';

import { type ITask } from '@/types/task';

const EditTask = (props: { task: ITask; onSubmit: (task?: ITask) => void }) => {
  const { task: initTask, onSubmit } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [task, setTask] = useState<ITask>(initTask);

  const ref = useOutsideClick(() => onSubmit(task.name ? task : undefined));

  return (
    <Card ref={ref}>
      <Flex gap={14} vertical>
        <TagSelect
          tagId={task.tagId}
          onChange={(tag) => {
            setTask((current) => ({ ...current, tagId: tag?.id }));
            inputRef.current?.focus();
          }}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(task.name ? task : undefined);
          }}
        >
          <input
            style={{ height: 'auto' }}
            ref={inputRef}
            placeholder='Task name...'
            autoComplete='off'
            autoFocus
            value={task.name}
            onChange={(e) =>
              setTask((current) => ({ ...current, name: e.target.value }))
            }
          />
        </form>
      </Flex>
    </Card>
  );
};

export default EditTask;
