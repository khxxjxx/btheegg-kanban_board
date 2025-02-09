import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { tagState } from '@/store/atoms';
import { TagColors } from '@/contexts/global';
import { Button, Dropdown, Flex, Icon, Text, Tag } from '@/components/atoms';
import { ITag, TTagColor } from '@/types/tag';

interface TagSelectProps {
  tagId?: string;
  onChange: (tag?: ITag) => void;
}

const TagSelect = (props: TagSelectProps) => {
  const { tagId, onChange } = props;

  const searchRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useRecoilState(tagState);

  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<ITag>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const filteredTags = useMemo(
    () => tags.filter(({ name }) => name.includes(searchValue)),
    [searchValue, tags],
  );

  function keyboardHandler(e: React.KeyboardEvent<HTMLLIElement>) {
    const lastIndex = filteredTags.length;
    const minIndex = 1;

    switch (e.key) {
      case 'ArrowUp': {
        const index = selectedIndex - 1;
        const currentIndex = index < minIndex ? lastIndex : index;

        setSelectedTag(filteredTags[currentIndex - 1]);
        return setSelectedIndex(currentIndex);
      }
      case 'ArrowDown': {
        const index = selectedIndex + 1;
        const currentIndex = index > lastIndex ? minIndex : index;

        setSelectedTag(filteredTags[currentIndex - 1]);
        return setSelectedIndex(currentIndex);
      }
    }
  }

  function onSubmit(tag?: ITag, type?: 'create') {
    setSearchValue('');
    setOpenDropdown(false);
    setSelectedTag(tag);

    onChange?.(tag);
    tag && type === 'create' && setTags([...tags, tag]);
  }

  const currentTag = useMemo(
    () => tags.find((tag) => tag.id === tagId),
    [tags, tagId],
  );

  useEffect(() => {
    openDropdown && searchRef.current?.focus();
  }, [openDropdown]);

  return (
    <Dropdown
      width='auto'
      open={openDropdown}
      onOpen={setOpenDropdown}
      targetFields={{ key: 'id' }}
      selectedOption={selectedTag}
      options={filteredTags}
      labelRender={(option) => <Tag color={option.color}>{option.name}</Tag>}
      onChange={(option) => onSubmit(option)}
      render={(originNode) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (selectedTag) return onSubmit(selectedTag);

            const target = e.target as {
              search?: { value: string };
              color?: { value: TTagColor & 'on' };
            };
            const name = target.search?.value;
            let color = target.color?.value;

            if (!name) return;
            if (color === 'on') color = undefined;

            const selectTag = { id: nanoid(16), name, color };
            onSubmit(selectTag, 'create');
          }}
        >
          <li
            className='search'
            onClick={(e) => e.stopPropagation()}
            onKeyDown={keyboardHandler}
          >
            <input
              ref={searchRef}
              name='search'
              placeholder='Search...'
              autoComplete='off'
              value={selectedTag?.name ?? searchValue}
              onChange={(e) => {
                setSelectedTag(undefined);
                setSearchValue(e.target.value);
              }}
            />
          </li>
          <li onClick={(e) => e.stopPropagation()}>
            <Flex vertical gap={4}>
              <Text variant='description'>Color</Text>
              <Flex gap={4}>
                {[undefined, ...TagColors].map((color) => {
                  const colorName = color || 'default';

                  return (
                    <Color
                      name='color'
                      key={colorName}
                      checked={selectedTag?.color === color}
                      value={color}
                      title={colorName}
                      color={color}
                      onChange={(e) => {
                        const value = e.target.value as TTagColor & 'on';

                        const name = selectedTag?.name || searchValue;
                        const color = value === 'on' ? undefined : value;

                        const selectTag = { id: nanoid(16), name, color };

                        name
                          ? onSubmit(selectTag, 'create')
                          : setSelectedTag(selectTag);
                      }}
                    />
                  );
                })}
              </Flex>
            </Flex>
          </li>

          {originNode}
        </form>
      )}
    >
      {currentTag ? (
        <Flex align='center' justify='space-between'>
          <Tag color={currentTag.color}>{currentTag.name}</Tag>
          <Button
            size='sm'
            shape='circle'
            color='black50'
            bgColor='black0'
            icon={<Icon type='close' />}
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
          />
        </Flex>
      ) : (
        <Button bgColor='black0' icon={<Icon type='plus' />}>
          태그 추가
        </Button>
      )}
    </Dropdown>
  );
};

const Color = styled('input')
  .attrs({ type: 'radio' })
  .withConfig({
    shouldForwardProp: (prop) => !['color'].includes(prop),
  })<{ color?: TTagColor }>`
  appearance: none;

  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 1px solid white;
  margin: 0;
  background-color: ${({ theme, color }) =>
    color ? theme.color[`${color}70`] : theme.color.black60};
  cursor: pointer;

  &:checked {
    outline: 1px solid
      ${({ theme, color }) =>
        color ? theme.color[`${color}70`] : theme.color.black60};
  }
`;

export default TagSelect;
