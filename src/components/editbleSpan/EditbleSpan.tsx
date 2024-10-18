import React from "react";
import styled from "styled-components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import { Form } from "../form/Form";
import { ShowStateType } from "../task/Task";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAutoAnimate } from "@formkit/auto-animate/react";
type PropsType = {
     children: React.ReactNode;
     onSubmit?: (value: string) => void;
     onRemove?: (taskId: string) => void;
     id?: string;
};

type OnEditParamType = "view" | "edit";

export const EditbleSpan: React.FC<PropsType> = React.memo((props) => {
     const [editMode, setEditMode] = React.useState(false);
     const [show, setShow] = React.useState<ShowStateType>({
          onMouse: false,
          onEdit: false,
     });
     const [parent] = useAutoAnimate();
     const mouseOverHandle = () => setShow((prev) => ({ ...prev, onMouse: true }));

     const mouseOutHandle = () => setShow((prev) => ({ ...prev, onMouse: false }));

     const setShowOnEditHandle = (value: boolean) => setShow((prev) => ({ ...prev, onEdit: value }));

     const onEdit = (type: OnEditParamType) => {
          if (type === "edit") {
               setEditMode(true);
               setShowOnEditHandle(true);
          }
          if (type === "view") {
               setEditMode(false);
               setShowOnEditHandle(false);
          }
     };

     const submitHandle = (value: string) => {
          props?.onSubmit?.(value);
          setEditMode(false);
          setShowOnEditHandle(false);
     };

     const clickDeleteHandle = () => {
          if (props.id && props.onRemove) props.onRemove(props.id);
          else throw new Error("component don't have a id prop");
     };

     const clickTitleHandle = () => {
          if (typeof props.children !== "string") throw new Error("child prop is not string");

          navigator.clipboard.writeText(String(props.children));
     };

     return (
          <S.Wrapper onMouseOver={mouseOverHandle} onMouseOut={mouseOutHandle}>
               <div ref={parent}>
                    {editMode ? (
                         <Form
                              placeholder="change title value"
                              defaultValue={props.children?.toString()}
                              onSubmit={submitHandle}
                              limit={20}
                         />
                    ) : (
                         <S.Title onClick={clickTitleHandle} onDoubleClick={() => onEdit("edit")}>
                              {props.children}
                         </S.Title>
                    )}
               </div>

               <div>
                    {(show.onEdit || show.onMouse) && (
                         <S.Controls>
                              <Button variant={!editMode ? "contained" : "text"} onClick={() => onEdit("view")}>
                                   <RemoveRedEyeIcon />
                              </Button>
                              <Button variant={editMode ? "contained" : "text"} onClick={() => onEdit("edit")}>
                                   <CreateIcon />
                              </Button>
                              <Button color="error" variant="contained" onClick={clickDeleteHandle}>
                                   <DeleteIcon />
                              </Button>
                         </S.Controls>
                    )}
               </div>
          </S.Wrapper>
     );
});

const S = {
     Wrapper: styled.div`
          display: flex;
          align-items: center;
          gap: 10px;

          width: 504px;
     `,
     Title: styled.span`
          font-weight: 300;
          font-size: 17px;

          display: block;
          margin: 20px 0;

          user-select: none;
          cursor: pointer;
     `,
     Controls: styled.div`
          display: flex;
          gap: 10px;
     `,
};
