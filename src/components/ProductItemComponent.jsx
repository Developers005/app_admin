import { createEffect, createSignal, onMount } from "solid-js";

const ProductItemComponent = (props) => {
  const [index, setIndex] = createSignal(undefined);

  createEffect(() => {
    console.log(props)
    const cartIndex = props.cartItems?.findIndex(item => item?.id === props.props?._id);
    if (cartIndex !== -1) {
      setIndex(cartIndex)
    } else {
      setIndex(undefined)
    }
    console.log(index())
  })

  return (
    <div 
    class="overflow-hidden h-fit"
    onClick={(e) => {
      e.stopPropagation()
      if (location.pathname === '/products') {
        console.log('correct dhaan...');
        props.navigate(`/products/item/${props.props._id}`)
      }
    }}>
      <div class="h-[200px] w-[330px] relative bg-black hover:scale-105 duration-500 cursor-pointer rounded-xl overflow-hidden">
        <img src={props.props.categoryImage || props.props.productimage} alt="img" class="object-cover rounded-xl h-full w-full" />
      </div>
      <div class="h-[30px] w-full flex justify-between items-center px-5">
        <div class="flex space-x-5">
          <div class="bg-white font-semibold">{props.props.category?.toUpperCase() || props.props.productname.toUpperCase()}</div>
          {
            props.props.productprice 
            &&
            <div class="font-semibold text-md text-gray-700">Rs.{props.props.productprice}</div>
          }
        </div>
        {
          (props.props.productstock !== null && props.props.productstock !== undefined)
          &&
          <div class="font-bold text-md">Qty: {props.props.productstock}</div>
        }
      </div>
      {
        props.page !== '/item/add_category'
        &&
        <>
          <div class="h-[50px] w-full flex justify-center items-center px-5">
            {
              index() !== undefined
              ?
              <div class="flex space-x-5">
                <button onClick={() => props.removeFromCart(props.props)} class="font-bold text-xl bg-green-500 w-7 text-white flex justify-center items-center h-7 rounded-sm">-</button>
                <div>{String(props.cartItems[index()]?.quantity)}</div>
                <button onClick={() => props.addToCart(props.props, location.pathname.split('/')[3])} class="font-bold text-xl bg-green-500 w-7 text-white flex justify-center items-center h-7 rounded-sm">+</button>
              </div>
              :
              <div>
                <button disabled={!props.props?.productstock} class="h-fit w-fit px-5 py-2 rounded-md text-white" onClick={() => props.addToCart(props.props, location.pathname.split('/')[3])} classList={{ " cursor-not-allowed bg-gray-500 ": props.props?.productstock === 0, " bg-green-500 ": props.props?.productstock !== 0 }}>Add To Cart</button>
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}

export default ProductItemComponent