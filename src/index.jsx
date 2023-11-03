/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Route, Router, Routes } from "@solidjs/router";
import "./index.css"

render(() => (
  <Router>
    <App/>
  </Router>
), document.getElementById("root"));
