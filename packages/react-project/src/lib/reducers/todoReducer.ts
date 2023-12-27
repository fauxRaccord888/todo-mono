import { Todo, getLocalTodoItems, setLocalTodoItems } from "@todo-mono/shared";
import { TodoAction } from "../types/Reducer";

export function todoReducer(state: Todo[], action: TodoAction) {
    switch (action.type) {
      case 'loadLocal': {
        const items = getLocalTodoItems()
        return [...items];
      }
      case 'addItem': {
        const { item } = action.payload

        const items = [...state, item]
        setLocalTodoItems(items)
        return items
      }
      case 'addCompleted': {
        const { todo, memo } = action.payload
        todo.addComplete(memo)

        const items = [...state]
        setLocalTodoItems(items)
        return items
      }
    }
    // throw Error('Unknown action: ' + action.type);
}
  