// eslint-disable-next-line import/no-extraneous-dependencies
import { addDays } from 'date-fns';
import { CompletedRecord } from './CompletedRecord';
import { Tag } from './Tag';

export interface TodoProps {
  title: string
  importance: number
  done: boolean
  repeatInterval: number
  dueDate: Date
  completed: CompletedRecord[]
  tags: Tag[]
}

export class Todo {
  title: string;
  importance: number;
  done: boolean;
  repeatInterval: number;
  completed: CompletedRecord[];
  dueDate: Date;
  tags: Tag[];

  constructor(props: TodoProps) {
    this.title = props.title;
    this.importance = props.importance;
    this.done = props.done;
    this.repeatInterval = props.repeatInterval;
    this.completed = props.completed;
    this.dueDate = props.dueDate;
    this.tags = props.tags;
  }

  addComplete(memo: string | undefined) {
    if (this.done === false) {
      const newRecord = new CompletedRecord({
        id: this.completed.length,
        completed: new Date(),
        memo: memo || ' ',
      });
      this.completed.push(newRecord);
    }
    if (this.repeatInterval === 0) this.done = true;
    this.dueDate = addDays(new Date(), this.repeatInterval);
  }
}
