import { createSignal } from "solid-js"
import { authFetch } from "../axios";
import { successToast, errorToast, oopsToast } from "../toast";
import Form from "./Form";




const Edit = (props) => {
  const [loading, setLoading] = createSignal(false);

  console.log(props);

  const refs = {
    name: '',
    amount: '',
    quantity: ''
  }

  const data = [
  {
    placeholder: 'Name',
    type: 'text',
    ref: 'name',
    value: props.props().productname
  },
  {
    placeholder: 'Amount',
    type: 'number',
    ref: 'amount',
    value: props.props().productprice
  },
  {
    placeholder: 'Quantity',
    type: 'number',
    ref: 'quantity',
    value: props.props().productstock 
  }
]
  
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true);
    const Data = { 
      category_id: props.category_id, 
      item_id: props.props()._id,
      update: {
        productname: refs.name.value.length > 0 ? refs.name.value : props.props().productname,
        productprice: refs.amount.value.length > 0 ? refs.amount.value : props.props().productprice,
        productstock: refs.quantity.value.length > 0 ? refs.quantity.value : props.props().productstock,
      }
     }
     console.log(Data)
    try {
      const res = await authFetch.patch('/item/item_update', { ...Data });
      const data = await res.data;
      console.log(data);
      if (data.message.toLowerCase() === 'success') {
        successToast('Successfully Updated');
        props.setIsOpen(false);
      } else {
        oopsToast(data.error);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div onClick={e => props.setIsOpen(false)} class="h-full w-full absolute top-0 bg-black z-50 bg-opacity-50">
      <div onClick={e => e.stopPropagation()} class="h-[60%] border-[3px] border-gray-900 w-[60%] z-20 bg-white absolute top-[20%] left-[20%] rounded-xl grid place-items-center">
        <Form array={data} refs={refs} submit={submit} loading={loading} />
      </div>
    </div>
  )
}

export default Edit