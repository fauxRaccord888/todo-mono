import { get, writable } from 'svelte/store';
import { Tag, localStorageStore, LOCAL_TAG_KEY } from '@todo-mono/shared';
function createTagStore() {
    const store = writable([]);
    const { subscribe, update } = store;
    function loadLocal() {
        const items = localStorageStore.getLocalTagItems();
        update(() => [...items]);
    }
    function saveLocal() {
        const items = get(store);
        localStorageStore.setLocalTagItems(items);
    }
    function addTag(tag) {
        update((items) => [...items, tag]);
        saveLocal();
    }
    function subscribeLocal() {
        loadLocal();
        window.addEventListener(LOCAL_TAG_KEY, loadLocal);
    }
    function unsubscribeLocal() {
        window.removeEventListener(LOCAL_TAG_KEY, loadLocal);
    }
    return {
        subscribe, subscribeLocal, unsubscribeLocal, addTag,
    };
}
export const tagStore = createTagStore();
export default tagStore;
