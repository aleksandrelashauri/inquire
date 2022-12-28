import React from "react";
import Container from "../components/mainContainer";
import Details from "../components/main/Details/Details";
import { WrongUrl } from "./wrongUrl";

const routes = () => [
  {
    path: "/",
    element: <Container />,
  },
  {
    path: "/:id",
    element: <Details />,
  },
  {
    path: "*",
    element: <WrongUrl />,
  },
];

export default routes;
