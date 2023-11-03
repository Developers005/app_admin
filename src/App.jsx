import Navbar from "./components/Navbar";
import {
  Components
} from "./pages/Export"
import Loading from "./assets/icons/Loading";
import { createResource, createSignal, For, onMount, Show } from "solid-js";
import { Toaster } from "solid-toast";
import { createStore, produce } from 'solid-js/store';
import CartItem from "./components/CartItem";
import { authFetch } from "./axios";

const pages = {
  home: '/',
  logout: '/logout',
  addUser: '/adduser',
  order: '/order',
  recharge: '/recharge',
  refund: '/refund',
  report: '/report',
  rfid: '/rfidactivation',
  shop: '/shop',
  userRegistration: '/userregistration',
  userUpdation: '/userupdation',
  category: '/category',
  products: '/products',
  item: '/products/item'
}


const fetchData = async () => {
  try {
    const res = await authFetch.get('/item/get_categories');
    console.log('res:',res)
    const data = await res.data;
    console.log('data: ', data)
    return await data.result;
  } catch (error) {
    console.log(error.message)
  }
}


function App() {
  const [isAuthorized, setIsAuthorized] = createSignal(true);
  const token = localStorage.getItem('accessToken');
  const [cart, setCart] = createStore([]);
  const [data, setData] = createStore([]);
  const [currentUser, setCurrentUser] = createSignal('');

  const [currentPage, setCurrentPage] = createSignal(pages.home);

  const addToCart = (product, category_id) => {
    console.log('before: ',cart)
    const isAlreadyInCart = cart.findIndex(prevProduct => product?._id === prevProduct?._id);
    if (isAlreadyInCart !== -1) {
      setCart(produce((state) => {
        state[isAlreadyInCart].quantity++;
      }))
    } else {
      setCart(produce((state) => {
        state.push({...product, quantity: 1, category_id});
      }));
    }
    console.log(cart)
  }
  
  const removeFromCart = (product) => {
    console.log('before: ',cart)
    const isAlreadyInCart = cart.findIndex(prevProduct => product._id === prevProduct._id);
    console.log(data[isAlreadyInCart])
    if (isAlreadyInCart === -1) {
      return;
    }
    if (cart[isAlreadyInCart].quantity === 1) {
      console.log('idhu running.....')
      setCart(produce((state) => {
        state.splice(isAlreadyInCart, 1);
        console.log('state: ',state)
      }))
    } else {
      setCart(produce((state) => {
        state[isAlreadyInCart].quantity--;
      }))
    }
    console.log(cart)
  }

  onMount(() => {
    if (data.length === 0 && token) {
      fetchData()
        .then(fetchedData => setData(prev => [...fetchedData]))
        .catch(err => console.error(err.message))
    }
    setCurrentPage(location.pathname)
  })

  const navigate = (e) => {
    console.log(e)
    history.replaceState(e, '', e)
    setCurrentPage(e);
  }

  setIsAuthorized(token);

  return (
    <div class="h-screen w-screen flex" classList={{ " bg-gray-900 ": isAuthorized() }}>
        {
          isAuthorized()
          ?
          <>
            <Navbar setCurrentPage={navigate} currentPage={currentPage} />
            <div class="h-full w-[75%] absolute left-[128px] bg-white z-20 rounded-[40px]">
              <Show when={currentPage() === pages.home}>
                <Components.Home navigate={navigate} setCurrentUser={setCurrentUser} />
              </Show>
              <Show when={currentPage() === pages.logout}>
                <Components.Logout setIsAuthorized={setIsAuthorized}/>
              </Show>
              <Show when={currentPage() === pages.addUser}>
                <Components.AddUser/>
              </Show>
              <Show when={currentPage() === pages.order}>
                <Components.Order data={data} navigate={navigate}/>
              </Show>
              <Show when={currentPage() === pages.recharge}>
                <Components.Recharge/>
              </Show>
              <Show when={currentPage() === pages.refund}>
                <Components.Refund/>
              </Show>
              <Show when={currentPage() === pages.report}>
                <Components.Report/>
              </Show>
              <Show when={currentPage() === pages.rfid}>
                <Components.RFIDActivation/>
              </Show>
              <Show when={currentPage() === pages.shop}>
                <Components.Shop/>
              </Show>
              <Show when={currentPage() === pages.userRegistration}>
                <Components.UserRegistration/>
              </Show>
              <Show when={currentPage() === pages.userUpdation}>
                <Components.UserUpdation/>
              </Show>
              <Show when={currentPage().includes(pages.category)}>
                <Components.CategoryItem navigate={navigate}/>
              </Show>
              <Show when={currentPage().includes(pages.item)}>
                <Components.ProductItem item={cart} navigate={navigate} cartItems={cart.map(e => ({ id: e._id, quantity: e.quantity}))} addToCart={addToCart} removeFromCart={removeFromCart}/>
              </Show>
              <Show when={currentPage() === pages.products}>
                <Components.Products navigate={navigate} data={data} />
              </Show>
            </div>
            <Show when={(currentPage() === pages.home) || (currentPage() === pages.products) || (currentPage().includes(pages.item))}>
              <div class="h-[100%] w-[16.6%] bg-blue-100 absolute right-[0] top-[0%] rounded-[40px]">
              <div class="text-gray-900 h-[10%] text-xl font-bold text-center">{currentUser() || 'Roll no'}</div>
                <div class="h-[75%] overflow-y-scroll">
                  <For each={cart}>
                    {(item) => <CartItem addToCart={addToCart} item={item} removeFromCart={removeFromCart}/>}
                  </For>
                </div>
              </div>
            </Show>
          </>
          :
          <Components.Login setIsAuthorized={setIsAuthorized}/>
        }
        <Toaster/>
    </div>
  );
}

export default App;
