import { Tag, getLocalTagItems, setLocalTagItems, } from "@todo-mono/shared";
import { TagAction } from "../types/Reducer";

export function tagReducer(state: Tag[], action: TagAction) {
    switch (action.type) {
      case 'loadLocal': {
        const items = getLocalTagItems()
        return [...items];
      }
      case 'addItem': {
        const { item } = action.payload

        const items = [...state, item]
        setLocalTagItems(items)
        return items
      }
    }
    // throw Error('Unknown action: ' + action.type);
}
  