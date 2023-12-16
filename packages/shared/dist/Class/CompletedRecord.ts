export interface CompletedRecordProps {
  id: number;
  completed: Date;
  memo: string;
}

export class CompletedRecord {
  id:number;
  completed: Date;
  memo: string;

  constructor(props: CompletedRecordProps) {
    this.id = props.id;
    this.completed = props.completed ?? new Date();
    this.memo = props.memo;
  }
}
