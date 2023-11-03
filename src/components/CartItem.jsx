const CartItem = (props) => {
  console.log(props)
  return (
    <div class="text-gray-900 h-[20%] flex justify-between px-1">
      <div class="h-full w-[50%] flex flex-col justify-center items-start">
        <div>{props.item.productname}</div>
        <div>💲{props.item.productprice}</div>
      </div>
      <div class="h-full w-1/2 flex justify-end items-center">
        <div class="flex space-x-5 items-center">
          <button onClick={() => props.removeFromCart(props.item)} class="bg-green-500 cursor-pointer w-5 flex justify-center items-center h-5 rounded-sm text-lg">-</button>
          <div>{String(props.item.quantity)}</div>
          <button onClick={() => props.addToCart(props.item)} class="bg-green-500 w-5 cursor-pointer flex justify-center items-center h-5 rounded-sm text-lg">+</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem