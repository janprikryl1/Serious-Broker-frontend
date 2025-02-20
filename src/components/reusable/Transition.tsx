import {forwardRef, JSXElementConstructor, ReactElement, Ref} from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

export const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});