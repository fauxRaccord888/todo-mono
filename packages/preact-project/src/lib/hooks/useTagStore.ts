import { type Tag, localStorageStore, LOCAL_TAG_KEY } from '@todo-mono/shared';
import { useState } from 'preact/hooks';
import { type TagAction } from '../types/Hooks';

type Dispatcher = (action: TagAction) => void;

export default function useTagStore(): [Tag[], Dispatcher] {
  const [tags, setTags] = useState<Tag[]>([]);

  function loadLocal() {
    const items = localStorageStore.getLocalTagItems();
    setTags([...items]);
  }

  const dispatcher: Dispatcher = (action) => {
    switch (action.type) {
      case 'subscribe': {
        loadLocal();
        window.addEventListener(LOCAL_TAG_KEY, loadLocal);
        break;
      }
      case 'unsubscribe': {
        window.removeEventListener(LOCAL_TAG_KEY, loadLocal);
        break;
      }
      case 'addItem': {
        const { item } = action.payload;

        const items = [...tags, item];
        localStorageStore.setLocalTagItems(items);
        break;
      }
      default: throw Error('Unknown action');
    }
  };

  return [tags, dispatcher];
}
