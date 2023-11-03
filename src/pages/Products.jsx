import { For } from "solid-js"
import ProductItem from "../components/ProductItemComponent"
import ProductItemComponent from "../components/ProductItemComponent"

const Products = (props) => {
  return (
    <div class="h-full w-full relative">
      <div class="h-[90%] w-full flex justify-center items-center pt-[4%]">
        {
          (props.data && (props.data?.length > 0))
          ?
          <div class=" grid grid-cols-3 gap-y-24 gap-x-10 h-[90%] overflow-y-scroll">
            <For each={props.data}>
              {(item) => <ProductItemComponent navigate={props.navigate} props={item} page={'/item/add_category'}/>}
            </For>
          </div>
          :
          <img src="/empty.webp" />
        }
      </div>
    </div>
  )
}

export default Products