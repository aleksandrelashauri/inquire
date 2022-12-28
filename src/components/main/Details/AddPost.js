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
import { useDispatch } from "react-redux";
import axios from "axios";
import { editData } from "../../redux/Actions/actionsInput";
import { useLocation } from "react-router-dom";

import * as Yup from "yup";
import { Box } from "@mui/material";

export default function AddPost() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loc = location.pathname.substring(1);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitValue = async () => {
    const inputList = {
      title,
      body,
    };

    const yupObject = Yup.object().shape({
      title: Yup.string().required("required"),
      body: Yup.string().required("required"),
    });
    try {
      await yupObject.validate(inputList);
      const response = await axios(`/posts/${loc}`, {
        method: "POST",
        header: "Content-Type: application/json",
        data: {
          title: inputList.title,
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
      dispatch(editData(inputList));
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

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          add post
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Write new Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
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
