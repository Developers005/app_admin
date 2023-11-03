import { useNavigate, useLocation, useParams, useRoutes } from "@solidjs/router";
import axios from "axios";
import { createResource, Show, For, createSignal, createEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store"
import Modal from "../components/Modal";
import { onMount } from "solid-js";
import ListItem from "../components/ListItem";
import { authFetch } from "../axios";
import Edit from "../components/Edit";
import { errorToast, oopsToast, successToast } from "../toast";

const Data = [
  {
    placeholder: 'Name',
    type: 'text',
    ref: 'name'
  },
  {
    placeholder: 'Amount',
    type: 'number',
    ref: 'amount'
  },
  {
    placeholder: 'Image',
    type: 'file',
    ref: 'img'
  }
]
const refs = {
  name: '',
  amount: '',
  img: ''
}

const fetchData = async () => {
  try {
    console.log('fetching...')
    const res = await authFetch.get(`/item/get_categories_details/${location.pathname.split('/')[2]}`);
    const data = await res.data;
    console.log('data:', data);
    return data.result?.categorydetails;
  } catch (error) {
    console.log(error.message);
  }
}

const CategoryItem = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [editorVisible, setEditorVisible] = createSignal(false);
  const [item_id, setItemId] = createSignal('');
  // const [data] = createResource(fetchData);
  const [data, setData] = createStore([]);

  const pathname = location.pathname.split('/')[2];
  
  const navigate = useNavigate();

  const openEditor = (id) => {
    setItemId(id)
    setEditorVisible(true);
  }

  onMount(() => {
    const isAvailable =localStorage.getItem(`${location.pathname.split('/')[2]}`);
    console.log(isAvailable);
    // location.reload()
    if (!isAvailable || JSON.parse(isAvailable)?.length === 0) {
      fetchData()
        .then(data => setData(prev => [...data]))
        .catch(err => console.log(err.message))
    } else {
      setData(prev => [...JSON.parse(isAvailable)]);
    }
  });

  onCleanup(() => {
    console.log('storing: ', location.pathname.split('/')[2]);
    localStorage.setItem(pathname,JSON.stringify(data));
  })

  const submit = async (item_id) => {
    console.log(item_id)
    try {
      const res = await authFetch.delete('/item/remove_item', { data: { item_id, category_id: location.pathname.split('/')[2] } });
      const data = await res.data;
      console.log(data);
      if (data.message.toLowerCase() === 'success') {
        successToast('Successfully deleted');
      } else {
        oopsToast(data.error);
      }
    } catch (error) {
      errorToast(error.message)
    }
  }
    

  createEffect(() => {
    console.log(location.pathname)
  })

  return (
    <div class="h-full w-full relative">
      <Show when={isOpen()}>
        <Modal setIsOpen={setIsOpen} path={'/item/add_item'} data={Data} refs={refs} id={location.pathname.split('/')[2]}/>
      </Show>
      <Show when={editorVisible()}>
        <Edit setIsOpen={setEditorVisible} category_id={location.pathname.split('/')[2]} props={item_id}/>
      </Show>
      <div class="h-[10%] w-full flex z-20 justify-between text-white font-extrabold text-[30px] px-10 py-5">
        <button onClick={(e) => {
          e.stopPropagation()
          props.navigate('/order')
        }} class="bg-gray-900 z-20 h-16 w-16 rounded-full grid place-items-center pb-1">&lt</button>
        <button onClick={() => setIsOpen(prev => !prev)} class="bg-gray-900 z-20 h-16 w-16 rounded-full grid place-items-center pb-1" classList={{ " rotate-45 pl-[2px] ": isOpen() }}>+</button>
      </div>
      <div class="h-[90%] w-full flex justify-center items-center">
        {
          (data && data?.length > 0)
          ?
          <div class="grid grid-cols-3 gap-x-10 gap-y-0 h-[90%] overflow-y-scroll">
            <For each={data}>
              {(item) => <ListItem key={item?._id} submit={submit} props={item} setEditorVisible={openEditor} page={'products'}/>}
            </For>
          </div>
          :
          <img src="/empty.webp" />
        }
      </div>
    </div>
  )
}

export default CategoryItem