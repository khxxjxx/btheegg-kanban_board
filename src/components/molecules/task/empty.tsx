import { Button, Card, Flex, Icon, Text } from '@/components/atoms';

const EmptyTask = (props: { addTask: () => void }) => {
  const { addTask } = props;

  return (
    <Card theme={{ color: { black0: '#ffffff66' } }} height='112px'>
      <Flex align='center' justify='center' gap={13} vertical>
        <Text variant='description'>지금 바로 추가해보세요.</Text>
        <Button icon={<Icon type='plus' />} shape='round' onClick={addTask} />
      </Flex>
    </Card>
  );
};

export default EmptyTask;
