import { PropsWithOptionalClassStyle } from "../../types/Prop"

function StyledTitle (props: PropsWithOptionalClassStyle) {

    return (
        <h2
            {...props}
            className={`${props.className ?? ''} flex flex-col text-4xl text-center`}
        >
            {props.children}
        </h2>
    )
}

export default StyledTitle