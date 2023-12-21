import { CompletedRecord, Tag, Todo } from '@todo-mono/shared';
import { DeserializedTag, DeserializedTodo } from '../types/todoType';

export function deserializeTag(serialized: Tag[]): DeserializedTag[] {
  const result = serialized.map((t) => ({ ...t }));
  return result;
}

export function serializeTag(deserialized: DeserializedTag[]): Tag[] {
  const result = deserialized.map((t) => new Tag(t));
  return result;
}

export function deserializeTodo(serialized: Todo[]): DeserializedTodo[] {
  const result = serialized.map((td) => ({
    ...td,
    completed: [...td.completed.map((c) => ({ ...c }))],
    tags: [...td.tags.map((tg) => ({ ...tg }))],
  }));
  return result;
}

export function serializeTodo(deserialized: DeserializedTodo[]): Todo[] {
  const result = deserialized.map((d) => {
    const tags = d.tags.map((t) => new Tag(t));
    const completed = d.completed.map((c) => new CompletedRecord(c));
    const todo = new Todo({ ...d, tags, completed });
    return todo;
  });
  return result;
}
