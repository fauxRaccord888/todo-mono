import { localStorageStore, LOCAL_TAG_KEY } from '@todo-mono/shared';
import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { deserializeTag, serializeTag } from '../utils/serializer';
import { DeserializedTag } from '../types/todoType';

function createTags() {
  const [tags, setTags] = createStore<DeserializedTag[]>([]);

  const loadLocal = () => {
    const localTag = localStorageStore.getLocalTagItems();
    const deserializedTag = deserializeTag(localTag);
    setTags([...deserializedTag]);
  };

  const saveLocal = () => {
    const serializedTags = serializeTag(tags);
    localStorageStore.setLocalTagItems(serializedTags);
  };

  const subscribe = () => {
    loadLocal();
    window.addEventListener(LOCAL_TAG_KEY, loadLocal);
  };

  const unsubscribe = () => {
    window.removeEventListener(LOCAL_TAG_KEY, loadLocal);
  };

  const addTag = (tag: DeserializedTag) => {
    setTags([...tags, tag]);
    saveLocal();
  };

  const deleteTag = (tag: DeserializedTag) => {
    setTags([...tags.filter((t) => t.name !== tag.name)]);
    saveLocal();
  };

  return {
    tags, subscribe, unsubscribe, addTag, deleteTag,
  };
}

export default createRoot(createTags);
