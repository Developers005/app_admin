import { For, createSignal, onMount } from "solid-js"
import axios from "axios"
import CategoryInput from "./CategoryInput";
import Form from "./Form";
import { errorToast, oopsToast, successToast } from "../toast";
import { authFetch } from "../axios";

const Modal = (props) => {
  console.log(props)
  const [loading, setLoading] = createSignal(false);
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault()
    console.log(props.refs.img.files, props.refs.name.value);
    const formData = new FormData();
    
    if (props.path === '/item/add_item') {
      formData.append('item', props.refs.name.value);
      formData.append('price', props.refs.amount.value);
      formData.append('item_stock', 0);
      console.log('length of id', props.id)
      formData.append('_id', props.id);
    } else if (props.path === '/item/add_category') {
      formData.append('category', props.refs.name.value);
    }
      formData.append('image', props.refs.img.files[0]);
    try {
      const res = await authFetch.post(`${props.path}`, formData);
      const data = await res.data;
      console.log(data)
      if (data.message.toLowerCase() === 'success') {
        successToast('Successfully created');
        props.setIsOpen(false);
      } else {
        oopsToast(data.message)
      }
    } catch (error) {
      errorToast(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  
  
  return (
    <div class="h-full w-full absolute top-0 bg-black z-10 bg-opacity-50">
      <div class="h-[60%] border-[3px] border-gray-900 w-[60%] z-20 bg-white absolute top-[20%] left-[20%] rounded-xl grid place-items-center">
        <Form array={props.data} refs={props.refs} submit={submit} loading={loading} />
      </div>
    </div>
  )
}

export default Modal