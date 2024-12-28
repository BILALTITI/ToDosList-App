import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import ToDo from "./TODO";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToDos } from './Contexts/toDosContext'; 
import { useToast } from "./Contexts/ToastContext";
import {useMemo,useEffect}from "react"
import { useState } from "react";

export default function ToDoList() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [titleInput, SetTitileInput] = useState("");
  const [DialogToDo, setDialogToDo] = useState(null);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const { toDos, toDosDispatch } = useToDos(); 
  const { showHideToast } = useToast();

  // Filter Todos
  const CompletedToDos = useMemo(() => toDos.filter(t => t.isCompleted), [toDos]);
  const notCompletedToDos = useMemo(() => toDos.filter(t => !t.isCompleted), [toDos]);

  let toDosToBeRendered = displayedTodosType === "Completed" ? CompletedToDos :
    displayedTodosType === "non-Completed" ? notCompletedToDos : toDos;

  const toDosjsx = toDosToBeRendered.map((t) => (
    <ToDo
      key={t.id}
      ToDo={t}
      showDelete={showsDeleteDialog}
      showUpdate={showsUpdateDialog}
    />
  ));

  useEffect(() => {
    toDosDispatch({ type: "get" });
  }, [toDosDispatch]);

  function handleAddClick() {
    if (titleInput) {
      toDosDispatch({ type: "added", payLoad: { newTitle: titleInput } });
      SetTitileInput("");
      showHideToast("تم أضافة المهمة  بنجاح ");
    }
  }

  function ChangeDisplayType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleDeleteConfirm() {
    toDosDispatch({
      type: "deleted",
      payLoad: { id: DialogToDo.id },
    });
    setShowDeleteDialog(false);
    showHideToast("تم حذف المهمة  بنجاح !");
  }

  function handleUpdateConfirm() {
    toDosDispatch({
      type: "updated",
      payLoad: {
        title: DialogToDo.title,
        details: DialogToDo.details,
        id: DialogToDo.id,
      },
    });
    setShowUpdateDialog(false);
    showHideToast("تم تعديل المهمة  بنجاح ");
  }

  function showsDeleteDialog(ToDo) {
    setDialogToDo(ToDo);
    setShowDeleteDialog(true);
  }

  function showsUpdateDialog(ToDo) {
    setDialogToDo(ToDo);
    setShowUpdateDialog(true);
  }

  function handleCloseClick() {
    setShowDeleteDialog(false);
  }

  function handleUpdateCloseClick() {
    setShowUpdateDialog(false);
  }
  return (
    <>
      {/* Diloge Delete Modal  */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleCloseClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClick}>أغلاق </Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم , احذف المهمة
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Dialog Delete Modal === */}

      {/* Dialog  Edit/update Modal   */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handleUpdateCloseClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من تعديل المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن التعديل بعد اتمامه
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={DialogToDo?.title}
            onChange={(e) => {
              setDialogToDo({
                ...DialogToDo,
                title: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="وصف المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={DialogToDo?.details}
            onChange={(e) => {
              setDialogToDo({
                ...DialogToDo,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCloseClick}>أغلاق </Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            نعم , قم بتعديل المهمة
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Dialog    Edit/update  Modal === */}

      <Container maxWidth="sm">
        <Card
          style={{ maxHeight: "50vh", minHeight: "100vh" , overflow: "scroll" }}
        >
          <CardContent minWidth="275px">
            <Typography variant="h2">مهامي</Typography>
            <Divider />
            {/* Filter Button  */}
            <ToggleButtonGroup
              value={displayedTodosType}
              //   exclusive
              onChange={ChangeDisplayType}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "30px" }}
              color="primary"
            >
              <ToggleButton value="non-Completed" aria-label="left aligned">
                غير منجز
              </ToggleButton>
              <ToggleButton value="Completed" aria-label="centered">
                المنجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="right aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>

            {/* ============Filter Button  ====================*/}
            {/* All To Do */}
            {toDosjsx}
            {/*===========  All To Do ======= */}
            {/* Input +Add Button */}

            <Grid container spacing={1} style={{ marginTop: "5vh " }}>
              <Grid
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                size={8}
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    SetTitileInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                size={4}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  اضافة{" "}
                </Button>
              </Grid>
            </Grid>
            {/*===  Input +Add Button === */}
          </CardContent>
        </Card>
      </Container>
    </>
  );

}