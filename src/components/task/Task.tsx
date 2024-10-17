import Checkbox from "@mui/material/Checkbox";
import React from "react";
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
     const submitHandle = (value: string) => {
          props.updateTask(id, value);
     };

     const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
          props.setCheked(id, e.currentTarget.checked);
     };

     return (
          <S.Wrapper>
               <Checkbox onChange={changeHandle} checked={props.cheked} />

               <EditbleSpan id={id} onRemove={onRemove} onSubmit={submitHandle}>
                    {props.children}
               </EditbleSpan>
          </S.Wrapper>
     );
});
