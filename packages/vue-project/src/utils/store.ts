import { reactive } from 'vue';
import {
  Tag, Todo, getLocalTagItems, getLocalTodoItems, setLocalTagItems, setLocalTodoItems,
} from '@todo-mono/shared';

interface StoreProps {
  loadLocal: Function,
  saveLocal: Function
  add: Function,
  delete: Function
}

interface TodoStoreProps extends StoreProps {
  todos: Todo[],
  addComplete: Function
}

interface TagStoreProps extends StoreProps {
  tags: Tag[]
}

export const todoStore = reactive<TodoStoreProps>({
  todos: [],
  loadLocal() {
    this.todos = getLocalTodoItems();
  },
  saveLocal() {
    setLocalTodoItems(this.todos);
  },
  add(todo: Todo) {
    if (this.todos.some((t) => t.title === todo.title)) return false;
    this.todos.push(todo);
    this.saveLocal();
    return true;
  },
  delete(todo: Todo) {
    this.todos.filter((e) => e !== todo);
    this.saveLocal();
  },
  addComplete(todo: Todo, memo: string) {
    const target = this.todos.filter((e) => e === todo)[0];
    target.addComplete(memo);
    this.saveLocal();
  },
});

export const tagStore = reactive<TagStoreProps>({
  tags: [],
  loadLocal() {
    this.tags = getLocalTagItems();
  },
  saveLocal() {
    setLocalTagItems(this.tags);
  },
  add(tag: Tag) {
    if (this.tags.some((t) => t.name === tag.name)) return false;
    this.tags.push(tag);
    this.saveLocal();
    return true;
  },
  delete(tag: Tag) {
    this.tags.filter((e) => e !== tag);
    this.saveLocal();
  },
});

export default { todoStore };
