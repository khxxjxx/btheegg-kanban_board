import { atom, AtomEffect } from 'recoil';
import { type IGroup } from '@/types/group';
import { type ITask } from '@/types/task';
import { type ITag } from '@/types/tag';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const projectNameState = atom<string>({
  key: 'projectNameState',
  default: 'Project No.1',
  effects: [localStorageEffect('projectName')],
});

export const groupState = atom<IGroup[]>({
  key: 'groupState',
  default: [
    { id: '1', name: '시작 전', lock: true },
    { id: '2', name: '진행 중', lock: true },
    { id: '3', name: '완료', lock: true },
  ],
  effects: [localStorageEffect('group')],
});

export const taskState = atom<ITask[]>({
  key: 'taskState',
  default: [],
  effects: [localStorageEffect('tasks')],
});

export const tagState = atom<ITag[]>({
  key: 'tagState',
  default: [],
  effects: [localStorageEffect('tags')],
});
