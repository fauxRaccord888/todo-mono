export interface TagProps {
  name: string,
  color: string
}

export class Tag {
  name: string;
  color: string;
  constructor(props: TagProps) {
    this.name = props.name;
    this.color = props.color;
  }
}
