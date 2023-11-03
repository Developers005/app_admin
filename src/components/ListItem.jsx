import { useNavigate } from "@solidjs/router"
import Edit from "../assets/icons/Edit";
import Delete from "../assets/icons/Delete";

const ListItem = (props) => {
  const navigate = useNavigate();

  return (
    <div 
    class="overflow-hidden h-fit"
    onClick={(e) => {
      e.stopPropagation()
      if (location.pathname === '/order') {
        props.navigate(`/category/${props.props._id}`)
      }
    }}>
      <div class="h-[200px] w-[330px] relative bg-black hover:scale-105 duration-500 cursor-pointer rounded-xl overflow-hidden">
        <img src={props.props.categoryImage || props.props.productimage} alt="img" class="object-cover rounded-xl h-full w-full" />
        <div onClick={e => {
          e.stopPropagation();
          if (props.page === '/item/add_category') {
            props.submit(props.props._id)
          } else {
            props.setEditorVisible(props.props)
          }
        }} class="h-[35px] w-[35px] bg-white absolute top-5 right-5 flex justify-center items-center rounded-md">
          {
            props.page === '/item/add_category'
            ?
            <Delete height="1.7em" width="1.7em" />
            :
            <Edit height="1.7em" width="1.7em" />
          }
        </div>
        {
          props.page === 'products'
          &&
          <div onClick={e => {
            e.stopPropagation();
            props.submit(props.props._id)
          }} class="h-[35px] w-[35px] bg-white absolute top-20 right-5 flex justify-center items-center rounded-md">
              <Delete height="1.7em" width="1.7em" />
          </div>
        }
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
    </div>
  )
}

export default ListItem