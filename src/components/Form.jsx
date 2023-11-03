import { For } from "solid-js"
import Input from "./Input";

const Form = (props) => {
  return (
    <form onSubmit={props.submit} class="flex flex-col w-[50%] h-[80%] justify-center items-center space-y-10">
      <For each={props.array} fallback={<h4>Loading...</h4>}>
        {(data, index) => <Input data={data} refs={props.refs} type={data.type}/>}
      </For>
      <button disabled={props.loading()} type="submit" class="text-white px-16 py-2 text-lg rounded-lg" classList={{ " bg-green-600 hover:bg-green-500 cursor-pointer ": !props.loading(), " bg-gray-500 ": props.loading() }}>Submit</button>
    </form>
  )
}

export default Form;