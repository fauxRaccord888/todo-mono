import { ContextProvider, createContext } from '@lit/context';
import { LOCAL_TAG_KEY, Tag, localStorageStore } from '@todo-mono/shared';

export const tagContext = createContext<Tag[]>(Symbol('tags'));

type TagContext = typeof tagContext;
class TagContextProvider extends ContextProvider<TagContext> {
  subscribe() {
    this.loadLocal();
    window.addEventListener(LOCAL_TAG_KEY, this.loadLocal.bind(this));
  }

  unsubscribe() {
    window.removeEventListener(LOCAL_TAG_KEY, this.loadLocal.bind(this));
  }

  loadLocal() {
    const localTags = localStorageStore.getLocalTagItems();
    this.setValue([...localTags]);
  }

  saveLocal() {
    localStorageStore.setLocalTagItems(this.value);
  }

  addTag(tag: Tag) {
    this.setValue([...this.value, tag]);
    this.saveLocal();
  }
}

export const tagContextProvider = new TagContextProvider(document.body, { context: tagContext });
