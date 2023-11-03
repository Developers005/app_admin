import { For } from "solid-js"
import { Images } from "../assets/icons/Export"
import { A, useLocation, useNavigate } from "@solidjs/router"

function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav class="h-full w-[15%] box-border bg-gray-900 text-white flex items-end pl-7 justify-end space-y-5">
      <div class="h-[100%] w-[100%] flex flex-col space-y-5 overflow-y-scroll pb-5 pt-5">
        <For each={Images}>
          {(Image) => {
            return (
              <div onClick={() => props.setCurrentPage(Image.pathname)} class="shrink-0 w-[70px] aspect-square flex justify-center items-center duration-[250ms] ease-out cursor-pointer rounded-[50%] hover:rounded-xl hover:bg-green-500" classList={{ " rounded-xl bg-green-500 " : props.currentPage() === Image.pathname, "bg-green-800":  props.currentPage() !== Image.pathname }}>
                <Image.page height="1.7em" width="1.7em" />
              </div>
            )
          }}
        </For>
      </div>
    </nav>
  )
}

export default Navbar