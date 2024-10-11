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
     updateTask: (taskId: string, title: string) => void;
     setCheked: (taskId: string, cheked: boolean) => void;
};

export type ShowStateType = {
     onMouse: boolean;
     onEdit: boolean;
};

export const Task: React.FC<PropsType> = React.memo(({ id, onRemove, ...props }) => {
     const [show, setShow] = React.useState<ShowStateType>({
          onMouse: false,
          onEdit: false,
     });

     const mouseOverHandle = React.useCallback(() => setShow((prev) => ({ ...prev, onMouse: true })), []);

     const mouseOutHandle = React.useCallback(() => setShow((prev) => ({ ...prev, onMouse: false })), []);

     const clickHandle = React.useCallback(() => onRemove(id), [id, onRemove]);

     const setShowOnEditHandle = (value: boolean) => setShow((prev) => ({ ...prev, onEdit: value }));

     const submitHandle = (value: string) => {
          props.updateTask(id, value);
     };

     const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
          props.setCheked(id, e.currentTarget.checked);
     };

     return (
          <S.Wrapper onMouseOver={mouseOverHandle} onMouseOut={mouseOutHandle}>
               <Checkbox onChange={changeHandle} checked={props.cheked} />

               <EditbleSpan onSubmit={submitHandle} setShow={setShowOnEditHandle} show={show}>
                    {props.children}
               </EditbleSpan>

               {(show.onMouse || show.onEdit) && (
                    <Button color="error" variant="contained" onClick={clickHandle}>
                         <DeleteIcon />
                    </Button>
               )}
          </S.Wrapper>
     );
});
