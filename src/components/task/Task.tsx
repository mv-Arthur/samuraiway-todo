import { Button, Checkbox } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { S } from "./task.styled";
import { EditbleSpan } from "../editbleSpan/EditbleSpan";

type PropsType = {
     id: string;
     children?: React.ReactNode;
     cheked: boolean;
     onRemove: (taskId: string) => void;
};

export const Task: React.FC<PropsType> = React.memo((props) => {
     const [show, setShow] = React.useState(false);
     const parent = React.useRef(null);

     const mouseOverHandle = React.useCallback(() => setShow(true), []);

     const mouseOutHandle = React.useCallback(() => setShow(false), []);

     const clickHandle = React.useCallback(() => props.onRemove(props.id), []);

     return (
          <S.Wrapper onMouseOver={mouseOverHandle} onMouseOut={mouseOutHandle}>
               <Checkbox checked={props.cheked} />

               <EditbleSpan show={show}>{props.children}</EditbleSpan>

               {show && (
                    <Button color="error" variant="contained" onClick={clickHandle}>
                         <DeleteIcon />
                    </Button>
               )}
          </S.Wrapper>
     );
});
