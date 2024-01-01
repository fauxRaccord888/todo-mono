import { Tag, localStorageStore, LOCAL_TAG_KEY } from '@todo-mono/shared';
import { useSyncExternalStore } from 'react';
import type { TagAction } from '../types/Reducer';

function getSnapShot() {
  return localStorageStore.tagItems;
}

function subscribe(callback: () => void) {
  window.addEventListener(LOCAL_TAG_KEY, callback);
  return () => {
    window.removeEventListener(LOCAL_TAG_KEY, callback);
  };
}

type PseudoDispatcher = (action: TagAction) => void;

const useTagStore = (): [Tag[], PseudoDispatcher] => {
  const todos = useSyncExternalStore(subscribe, getSnapShot);

  const pseudoDispatcher = (action: TagAction): void => {
    switch (action.type) {
      case 'addItem': {
        const { item } = action.payload;
        const items = [...todos, item];
        localStorageStore.setLocalTagItems(items);
        break;
      }
      default: throw Error('Unknown action');
    }
  };

  return [todos, pseudoDispatcher];
};

export default useTagStore;
