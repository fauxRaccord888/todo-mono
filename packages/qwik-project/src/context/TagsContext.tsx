/* eslint-disable func-names */

/*
this 바인딩 때문에 화살표함수를 쓸 수 없음
공식 문서에서 메서드를 $(function (this) {})와 같이 쓰고 있음
https://qwik.builder.io/docs/components/state/#usestore
*/

import {
  useStore, $, createContextId, component$, useContextProvider, Slot,
} from '@builder.io/qwik';

import { getLocalTagItems, setLocalTagItems } from '@todo-mono/shared';
import { CustomStore } from './TodosContext';
import { deserializeTag, serializeTag } from '../utils/serializer';
import { DeserializedTag } from '../types/todoType';

interface TagsStore extends CustomStore<DeserializedTag> {}

export const tagsContext = createContextId<TagsStore>('Tags');
export default component$(() => {
  const tagsStore = useStore<TagsStore>({
    items: [],
    loadLocal$: $(function (this: TagsStore) {
      const serializedTodos = getLocalTagItems();
      const deserialized = deserializeTag(serializedTodos);
      this.items = [...deserialized];
    }),
    saveLocal$: $(function (this: TagsStore) {
      const serialized = serializeTag(this.items);
      setLocalTagItems(serialized);
    }),
    addItem$: $(function (this: TagsStore, tag: DeserializedTag) {
      this.items = [...this.items, tag];
      this.saveLocal$();
    }),
  });

  useContextProvider(tagsContext, tagsStore);

  return (
    <Slot />
  );
});
