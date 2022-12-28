import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  useEffect,
  // useState
} from "react";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addData, clearData } from "../redux/Actions/actionsInput";
import AddPost from "./Details/AddPost";

export default function Posts() {
  const dispatch = useDispatch();
  const { rows } = useSelector((state) => ({ rows: state.rows }));
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/posts");
        const { data } = response;
        const comments = await axios.get("/comments");
        dispatch(clearData());
        data?.forEach((elem) => {
          const productList = {
            title: elem.body,
            body: elem.title,
            id: elem.id,
            comment: comments?.data
              .filter((eleme) => eleme.postId === elem.id)
              .map((el) => {
                return el;
              }),
          };
          dispatch(addData(productList));
        });
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <React.StrictMode>
      <Grid container spacing={2}>
        {!rows
          ? "... Loading "
          : rows.map(({ title, body, id }) => {
              return (
                <Grid item xs={3} key={id}>
                  <Card sx={{ minWidth: 275, backgroundColor: "  aqua" }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                      <Typography variant="h5" component="div"></Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/${id}`}>Lets see post {id}</Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        <AddPost />
      </Grid>
    </React.StrictMode>
  );
}
