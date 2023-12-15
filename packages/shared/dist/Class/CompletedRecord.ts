export interface CompletedRecordProps {
  completed: Date;
  memo: string;
}

export class CompletedRecord {
  completed: Date;
  memo: string;

  constructor(props: CompletedRecordProps) {
    this.completed = props.completed ?? new Date();
    this.memo = props.memo;
  }
}
