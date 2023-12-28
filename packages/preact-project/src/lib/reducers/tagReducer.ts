import { type Tag, getLocalTagItems, setLocalTagItems } from '@todo-mono/shared';
import type { TagAction } from '../types/Reducer';

export function tagReducer(state: Tag[], action: TagAction) {
  switch (action.type) {
    case 'loadLocal': {
      const items = getLocalTagItems();
      return [...items];
    }
    case 'addItem': {
      const { item } = action.payload;

      const items = [...state, item];
      setLocalTagItems(items);
      return items;
    }
    default: throw Error('Unknown action');
  }
}

export default tagReducer;
