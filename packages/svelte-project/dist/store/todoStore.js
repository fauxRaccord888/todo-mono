import { get, writable } from 'svelte/store';
import { Todo, localStorageStore, LOCAL_TODO_KEY } from '@todo-mono/shared';
function createTodoStore() {
    const store = writable([]);
    const { subscribe, update } = store;
    function loadLocal() {
        const items = localStorageStore.getLocalTodoItems();
        update(() => [...items]);
    }
    function saveLocal() {
        const items = get(store);
        localStorageStore.setLocalTodoItems(items);
    }
    function addTodo(todo) {
        update((items) => [...items, todo]);
        saveLocal();
    }
    function addCompleted(todo, memo) {
        todo.addComplete(memo);
        update((items) => [...items]);
        saveLocal();
    }
    function subscribeLocal() {
        loadLocal();
        window.addEventListener(LOCAL_TODO_KEY, loadLocal);
    }
    function unsubscribeLocal() {
        window.removeEventListener(LOCAL_TODO_KEY, loadLocal);
    }
    return {
        subscribe, subscribeLocal, unsubscribeLocal, addTodo, addCompleted,
    };
}
export const todoStore = createTodoStore();
export default todoStore;
