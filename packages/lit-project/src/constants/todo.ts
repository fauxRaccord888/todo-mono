import { CompletedRecord } from '@todo-mono/shared';

export const INITIAL_VALUE = {
  title: '',
  importance: 1,
  done: false,
  repeatInterval: 0,
  dueDatePlus: 0,
  completed: new Array<CompletedRecord>(),
};

export default INITIAL_VALUE;
