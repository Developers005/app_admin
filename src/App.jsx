import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Submit from "./submit";

function App(props) {
  return (
    <>
    <Submit ref={props.ref}/>
    </>
  )
}

export default App;
