import ProductItemComponent from "../components/ProductItemComponent"
import { authFetch } from "../axios";
import { createSignal, onMount, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

const fetchData = async () => {
  try {
    console.log('fetching...', location.pathname.split('/')[3])
    const res = await authFetch.get(`/item/get_categories_details/${location.pathname.split('/')[3]}`);
    const data = await res.data;
    console.log(data)
    if (data.message.toLowerCase() === 'success') {
      localStorage.setItem(location.pathname.split('/')[2], JSON.stringify(data.result?.categorydetails))
    }
    return data.result?.categorydetails;
  } catch (error) {
    console.log(error.message);
  }
}

const ProductItem = (props) => {
  const [item_id, setItemId] = createSignal('');
  // const [data] = createResource(fetchData);
  const [data, setData] = createStore([]);
  console.log('props: ',props);

  const pathname = location.pathname.split('/')[3];

  onMount(() => {
    const isAvailable =localStorage.getItem(`${location.pathname.split('/')[3]}`);
    console.log('cart data', props.cartItems);
    console.log(location.pathname);
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
    console.log('storing: ', location.pathname.split('/'));
    setTimeout(() => localStorage.setItem(pathname,JSON.stringify(data)));
  });

  return (
    <div class="h-full w-full relative">
      <div class="h-[10%] w-full flex z-20 justify-between text-white font-extrabold text-[30px] px-10 py-5">
        <button onClick={(e) => {
          e.stopPropagation()
          props.navigate('/products')
        }} class="bg-gray-900 z-20 h-16 w-16 rounded-full grid place-items-center pb-1">&lt</button>
        <button onClick={() => {}} class="bg-gray-900 z-20 h-16 w-16 rounded-full grid place-items-center pb-1">+</button>
      </div>
      <div class="h-[90%] w-full flex justify-center items-center">
        {
          (data && data?.length > 0)
          ?
          <div class="grid grid-cols-3 gap-x-10 gap-y-0 h-[90%] overflow-y-scroll">
            <For each={data}>
              {(item) => <ProductItemComponent cartItems={props.cartItems} removeFromCart={props.removeFromCart} addToCart={props.addToCart} key={item?._id} props={item} page={'products'}/>}
            </For>
          </div>
          :
          <img src="/empty.webp" />
        }
      </div>
    </div>
  )
}

export default ProductItem