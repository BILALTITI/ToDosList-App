import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// dialog iMPORTS
import { useToast } from "./Contexts/ToastContext";
import { useToDos } from "./Contexts/toDosContext";

export default function ToDo({ ToDo, handlecheck, showDelete, showUpdate }) {
  const { toDos, toDosDispatch } = useToDos();
  const { showHideToast } = useToast();

  //Event Handler
  function handleCheckClick() {
    toDosDispatch({
      type: "checked",
      payLoad: { id: ToDo.id },
    });
    if (ToDo.isCompleted) {
      showHideToast("تم التراجع عن انجاز المهمة   بنجاح ");
    } else {
      showHideToast("تم انجاز المهمة   بنجاح ");
    }
  }

  function handleDeleteClick() {
    showDelete(ToDo);
  }
  function handleUpdateConfirm() {
    showUpdate(ToDo);
  }
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginBottom: 5,
          marginTop: "20px",
        }}
        className="toDoCard"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "right",
                  textDecoration: ToDo.isCompleted ? "line-through" : "none",
                }}
              >
                {ToDo.title}
              </Typography>{" "}
              <Typography
                variant="h6"
                style={{
                  textAlign: "right",
                  textDecoration: ToDo.isCompleted ? "line-through" : "none",
                }}
              >
                {ToDo.details}
              </Typography>{" "}
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Icon Button  */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: ToDo.isCompleted ? "white" : "#8bc34a",
                  background: ToDo.isCompleted ? "green" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>{" "}
              {/*=== Check Icon Button === */}
              {/* update Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1768aa",
                  background: "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={handleUpdateConfirm}
              >
                <EditOutlinedIcon />
                {/*=== Update Icon Button === */}
              </IconButton>{" "}
              {/* Delete Icon Button  */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              {/*=== Delete Icon Button === */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
