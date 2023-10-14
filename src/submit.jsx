import { createSelector, createSignal } from "solid-js";
import App from "./App"

function Submit(props) { 
  let name;
  const [n,setn]=createSignal('');

  const get=()=>{
    setn(name)
  }
  return (
    <div>
     <input  type="text" ref={name} placeholder="ghello"/>
      <button onClick={get}>click it</button>
      <h1>{n()}</h1>
    </div>
  )
}

export default Submit