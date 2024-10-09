import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent } from "react";
import { S } from "./form.styled";

type PropsType = {
     limit?: 20;
     onSubmit: (value: string) => void;
     defaultValue?: string;
};

export const Form: React.FC<PropsType> = React.memo(({ limit = 15, ...props }) => {
     const [value, setValue] = React.useState(props.defaultValue ? props.defaultValue : "");

     const haveAError = limit < value.length;

     const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value.trimStart());
     };

     const submitHandle = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!haveAError && !!value.trimEnd().length) {
               props.onSubmit(value);
               setValue("");
          }
     };

     return (
          <S.Form onSubmit={submitHandle}>
               <TextField
                    onChange={changeHandle}
                    variant="outlined"
                    label={haveAError ? "text limit exceeded" : "write a task title"}
                    error={haveAError}
                    value={value}
               />
               <Button
                    type="submit"
                    variant="contained"
                    color={haveAError ? "error" : "primary"}
                    disabled={haveAError || !value.length}
               >
                    OK
               </Button>
          </S.Form>
     );
});
