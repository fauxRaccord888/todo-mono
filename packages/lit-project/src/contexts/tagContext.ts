import { ContextProvider, createContext } from '@lit/context';
import { Tag, getLocalTagItems, setLocalTagItems } from '@todo-mono/shared';

export const tagContext = createContext<Tag[]>(Symbol('tags'));

type TagContext = typeof tagContext;
class TagContextProvider extends ContextProvider<TagContext> {
  loadLocal() {
    const localTags = getLocalTagItems();
    this.setValue([...localTags]);
  }

  saveLocal() {
    setLocalTagItems(this.value);
  }

  addTag(tag: Tag) {
    this.setValue([...this.value, tag]);
    this.saveLocal();
  }
}

export const tagContextProvider = new TagContextProvider(document.body, { context: tagContext });
