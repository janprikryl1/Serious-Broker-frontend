import Paper, {PaperProps} from "@mui/material/Paper";
import Draggable from "react-draggable";

export const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper
                {...props}
                style={{ backgroundColor: "#101214" }}
            />
        </Draggable>
    );
}