export type DeserializedCompleted = {
  id: number;
  completed: Date;
  memo: string;
};

export type DeserializedTag = {
  name: string,
  color: string
};

export type DeserializedTodo = {
  title: string
  importance: number
  done: boolean
  repeatInterval: number
  dueDate: Date
  completed: DeserializedCompleted[]
  tags: DeserializedTag[]
};
