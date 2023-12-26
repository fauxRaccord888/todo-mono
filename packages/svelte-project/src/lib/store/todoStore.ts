import { get, writable } from "svelte/store";
import { Todo, getLocalTodoItems, setLocalTodoItems } from "@todo-mono/shared"

function createTodoStore() {
    const store = writable<Todo[]>([])
    const {subscribe, update} = store

    function loadLocal() {
        const items = getLocalTodoItems()
        update(() => [...items])
    }

    function saveLocal() {
        const items = get(store)
        setLocalTodoItems(items)
    }

    function addTodo(todo: Todo) {
        update((items) => [...items, todo])
        saveLocal()
    }

    function addCompleted(todo: Todo, memo: string) {
        todo.addComplete(memo)
        update((items) => [...items])
        saveLocal()
    }

    return {
        subscribe, loadLocal, saveLocal, addTodo, addCompleted
    }
}

export const todoStore = createTodoStore()
export default todoStore