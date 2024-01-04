import { ref } from 'vue';
import {
  LOCAL_TAG_KEY, LOCAL_TODO_KEY, Tag, Todo, localStorageStore,
} from '@todo-mono/shared';

export function createTodoStore() {
  const todos = ref<Todo[]>([]);
  function loadLocal() {
    todos.value = localStorageStore.getLocalTodoItems();
  }

  function saveLocal() {
    localStorageStore.setLocalTodoItems(todos.value);
  }

  function subscribe() {
    loadLocal();
    window.addEventListener(LOCAL_TODO_KEY, loadLocal);
  }

  function unsubscribe() {
    window.removeEventListener(LOCAL_TODO_KEY, loadLocal);
  }

  function addItem(todo: Todo) {
    if (todos.value.some((t) => t.title === todo.title)) return false;
    todos.value.push(todo);
    saveLocal();
    return true;
  }

  function deleteItem(todo: Todo) {
    todos.value = todos.value.filter((e) => e !== todo);
    saveLocal();
  }

  function addComplete(todo: Todo, memo: string) {
    const target = todos.value.filter((e) => e === todo)[0];
    target.addComplete(memo);
    saveLocal();
  }

  return {
    todos, subscribe, unsubscribe, add: addItem, delete: deleteItem, addComplete,
  };
}

export function createTagStore() {
  const tags = ref<Tag[]>([]);
  function loadLocal() {
    tags.value = localStorageStore.getLocalTagItems();
  }

  function saveLocal() {
    localStorageStore.setLocalTagItems(tags.value);
  }

  function subscribe() {
    loadLocal();
    window.addEventListener(LOCAL_TAG_KEY, loadLocal);
  }

  function unsubscribe() {
    window.removeEventListener(LOCAL_TAG_KEY, loadLocal);
  }

  function addItem(tag: Tag) {
    if (tags.value.some((t) => t.name === tag.name)) return false;
    tags.value.push(tag);
    saveLocal();
    return true;
  }

  function deleteItem(tag: Tag) {
    tags.value = tags.value.filter((e) => e !== tag);
    saveLocal();
  }

  return {
    tags, subscribe, unsubscribe, add: addItem, delete: deleteItem,
  };
}

export const todoStore = createTodoStore();
export const tagStore = createTagStore();

export default { todoStore, tagStore };
