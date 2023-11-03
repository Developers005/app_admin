import { For, Show, createEffect, createResource, createSignal, onCleanup, onMount } from "solid-js"
import Modal from "../components/Modal";
import ListItem from "../components/ListItem";
import axios from "axios";
import { authFetch } from "../axios";
import { errorToast, oopsToast, successToast } from "../toast";

const refs = {
  name:  '',
  img: ''
}

const Data = [
  {
    placeholder: 'Name',
    type: 'text',
    ref: 'name'
  },
  {
    placeholder: 'Image',
    type: 'file',
    ref: 'img'
  }
]

function Order(props) {
  const [isOpen, setIsOpen] = createSignal(false);
  console.log(props.data);

  const deleteCategory = async (_id) => {
    console.log(_id)
    try {
      const res = await authFetch.delete('/item/remove_category', { data: {_id} });
      const data = await res.data;
      console.log(data);
      if (data.message.toLowerCase() === 'success') {
        successToast('Successfully deleted');
      } else {
        oopsToast(data.error);
      }
    } catch (error) {
      errorToast(error.message);
    }
  }

  onMount(async() => {

  });
  return (
    <div class="h-full w-full relative">
      <Show when={isOpen()}>
        <Modal setIsOpen={setIsOpen} path={'/item/add_category'} data={Data} refs={refs}/>
      </Show>
      <div class="h-[10%] w-full flex justify-end text-white font-extrabold z-20 text-[30px] px-10 py-5">
        <button onClick={() => setIsOpen(prev => !prev)} class="bg-gray-900 z-20 h-16 w-16 rounded-full grid place-items-center pb-1" classList={{ " rotate-45 pl-[2px] ": isOpen() }}>+</button>
      </div>
      <div class="h-[90%] w-full flex justify-center items-center">
        {
          (props.data && (props.data?.length > 0))
          ?
          <div class=" grid grid-cols-3 gap-10 h-[90%] overflow-y-scroll">
            <For each={props.data}>
              {(item) => <ListItem props={item} navigate={props.navigate} page={'/item/add_category'} submit={deleteCategory}/>}
            </For>
          </div>
          :
          <img src="/empty.webp" />
        }
      </div>
    </div>
  )
}

export default Order