import React from "react";
import styled from "styled-components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import { Form } from "../form/Form";

type PropsType = {
     children: React.ReactNode;
     show: boolean;
};

type OnEditParamType = "view" | "edit";

export const EditbleSpan: React.FC<PropsType> = React.memo((props) => {
     const [editMode, setEditMode] = React.useState(false);

     const onEdit = React.useCallback((type: OnEditParamType) => {
          if (type === "edit") setEditMode(true);
          if (type === "view") setEditMode(false);
     }, []);

     const submitHandle = React.useCallback((value: string) => {
          console.log(value);
     }, []);

     return (
          <>
               {editMode ? (
                    <Form defaultValue={props.children?.toString()} onSubmit={submitHandle} limit={20} />
               ) : (
                    <S.Title>{props.children}</S.Title>
               )}

               <>
                    {props.show && (
                         <>
                              <Button variant={!editMode ? "contained" : "text"} onClick={() => onEdit("view")}>
                                   <RemoveRedEyeIcon />
                              </Button>
                              <Button variant={editMode ? "contained" : "text"} onClick={() => onEdit("edit")}>
                                   <CreateIcon />
                              </Button>
                         </>
                    )}
               </>
          </>
     );
});

const S = {
     Title: styled.span`
          font-weight: 300;
          font-size: 17px;
          width: 304px;
          word-break: break-all;
     `,
};
