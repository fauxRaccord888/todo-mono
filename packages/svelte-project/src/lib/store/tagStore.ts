import { get, writable } from "svelte/store";
import { Tag, getLocalTagItems, setLocalTagItems } from "@todo-mono/shared"

function createTagStore() {
    const store = writable<Tag[]>([])
    const {subscribe, update} = store

    function loadLocal() {
        const items = getLocalTagItems()
        update(() => [...items])
    }

    function saveLocal() {
        const items = get(store)
        setLocalTagItems(items)
    }

    function addTag(tag: Tag) {
        update((items) => [...items, tag])
        saveLocal()
    }

    return {
        subscribe, loadLocal, saveLocal, addTag
    }
}

export const tagStore = createTagStore()
export default tagStore