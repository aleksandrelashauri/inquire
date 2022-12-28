import * as React from "react";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dialogi from "./Dialog";
import Editom from "./EditCom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Details() {
  const { rows } = useSelector((state) => ({ rows: state.rows }));
  const location = useLocation();
  const loc = location.pathname.substring(1);
  const data = rows.filter((data) => data.id == loc);
  console.log(data);
  return (
    <Card sx={{ minWidth: 275 }}>
      {data.map(({ title, body, comment, id }) => {
        console.log(data);
        return (
          <Box key={id}>
            <Typography>{title}</Typography>
            <Typography>{body}</Typography>
            <Box>
              {comment?.map((elem) => {
                return (
                  <ul key={elem.id}>
                    <Typography>mail : {elem.email}</Typography>
                    <Typography>name : {elem.name}</Typography>
                    <Typography>body : {elem.body}</Typography>
                  </ul>
                );
              })}
            </Box>
          </Box>
        );
      })}
      <Editom />
      <Dialogi />
      <Link to={"/"}> back </Link>
    </Card>
  );
}
