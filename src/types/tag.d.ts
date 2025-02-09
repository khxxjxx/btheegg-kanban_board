import { TagColors } from '@/contexts/global';

export type TTagColor = (typeof TagColors)[number];

export interface ITag {
  id: string;
  name: string;
  color?: TTagColor;
}
