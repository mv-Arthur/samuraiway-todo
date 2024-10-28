import React from "react";
import Button from "@mui/material/Button";
import { FilterValuesType } from "../../App";

type PropsType = {
     value: FilterValuesType;
     onChange: (value: FilterValuesType) => void;
};

export const ButtonGroup: React.FC<PropsType> = React.memo((props) => {
     const clickHandle = (value: FilterValuesType) => {
          switch (value) {
               case "all": {
                    props.onChange("all");
                    break;
               }

               case "completed": {
                    props.onChange("completed");
                    break;
               }

               case "pending": {
                    props.onChange("pending");
                    break;
               }
          }
     };

     return (
          <div style={{ display: "flex", gap: "10px" }}>
               <Button
                    color="primary"
                    variant={props.value === "all" ? "contained" : "outlined"}
                    onClick={() => clickHandle("all")}
               >
                    all
               </Button>
               <Button
                    color="success"
                    variant={props.value === "completed" ? "contained" : "outlined"}
                    onClick={() => clickHandle("completed")}
               >
                    completed
               </Button>
               <Button
                    color="secondary"
                    variant={props.value === "pending" ? "contained" : "outlined"}
                    onClick={() => clickHandle("pending")}
               >
                    pending
               </Button>
          </div>
     );
});
