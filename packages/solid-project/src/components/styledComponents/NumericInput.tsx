import { ComponentProps } from "solid-js";

interface NumericInputProps {
  value: number;
  min: number;
  max: number
}

export default function NumericInput(props: ComponentProps<'input'> & NumericInputProps) {
    return (
        <input
            {...props}
            type="number"
            min={props.min}
            max={props.max}
            value={props.value}
        />
    )
}

