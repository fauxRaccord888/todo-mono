type DeserializedCompleted = {
    id: number;
    completed: Date;
    memo: string;
  };
  
type DeserializedTag = {
    name: string,
    color: string
};

type DeserializedTodo = {
    title: string
    importance: number
    done: boolean
    repeatInterval: number
    dueDate: Date
    completed: DeserializedCompleted[]
    tags: DeserializedTag[]
};