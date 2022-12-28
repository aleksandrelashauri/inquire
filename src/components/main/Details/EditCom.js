import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addData } from "../../redux/Actions/actionsInput";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Yup = require("yup");

export default function Editom() {
  const dispatch = useDispatch();
  const { rows } = useSelector((state) => ({ rows: state.rows }));
  const location = useLocation();
  const loc = location.pathname.substring(1);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [postId, setPostId] = useState(loc);

  const submitValue = async () => {
    setPostId(loc);
    const inputList = {
      name,
      body,
      email,
      postId,
    };

    const yupObject = Yup.object().shape({
      email: Yup.string().required("required"),
      body: Yup.string().required("required"),
      name: Yup.string().required("required"),
      postId: Yup.string().required("required"),
    });
    try {
      await yupObject.validate(inputList);
      const response = await axios(`/comments`, {
        method: "POST",
        header: "Content-Type: application/json",
        data: {
          postId: inputList.postId,
          name: inputList.name,
          email: inputList.email,
          body: inputList.body,
        },
      });
      const { id } = response.data;
      inputList.id = id;
      toast.success("Item Updated !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setOpen(false);
      dispatch(addData(inputList));
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const newCom = rows.filter((data) => data.postId === postId);
  return (
    <Box>
      {
        <Box>
          {newCom?.map((elem) => {
            return (
              <ul key={elem.postId}>
                <Typography>mail : {elem.email}</Typography>
                <Typography>name : {elem.name}</Typography>
                <Typography>body : {elem.body}</Typography>
              </ul>
            );
          })}
        </Box>
      }
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          add comment
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>write a new comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label="body"
              type="text"
              fullWidth
              variant="standard"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label="body"
              type="text"
              fullWidth
              variant="standard"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitValue}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}
