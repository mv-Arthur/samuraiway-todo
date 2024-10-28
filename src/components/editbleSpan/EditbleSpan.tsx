import React from "react";
import { Form } from "../form/Form";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "../transition/TransitonGroup";
import { Button } from "@mui/material";
import { S } from "./styles.styled";

type PropsType = {
     children: React.ReactNode;
     onSubmit?: (value: string) => void;
     onRemove?: (taskId: string) => void;
     id?: string;
};

type OnEditParamType = "view" | "edit";

export const EditbleSpan: React.FC<PropsType> = React.memo((props) => {
     const [editMode, setEditMode] = React.useState(false);

     const onEdit = (type: OnEditParamType) => {
          if (type === "edit") {
               setEditMode(true);
          }
          if (type === "view") {
               setEditMode(false);
          }
     };

     const submitHandle = React.useCallback((value: string) => {
          props?.onSubmit?.(value);
          setEditMode(false);
     }, []);

     const clickDeleteHandle = React.useCallback(() => {
          if (props.id && props.onRemove) props.onRemove(props.id);
          else throw new Error("component don't have a id prop");
     }, []);

     const clickTitleHandle = () => {
          if (typeof props.children !== "string") throw new Error("child prop is not string");

          navigator.clipboard.writeText(String(props.children));
     };

     return (
          <>
               <S.Wrapper>
                    <TransitionGroup>
                         {editMode ? (
                              <Form
                                   placeholder="change title value"
                                   defaultValue={props.children?.toString()}
                                   onSubmit={submitHandle}
                                   limit={20}
                                   type="edit"
                              />
                         ) : (
                              <S.Title onClick={clickTitleHandle} onDoubleClick={() => onEdit("edit")}>
                                   {props.children}
                              </S.Title>
                         )}
                    </TransitionGroup>

                    <Button onClick={clickDeleteHandle} color="error">
                         <DeleteIcon />
                    </Button>
               </S.Wrapper>
          </>
     );
});
