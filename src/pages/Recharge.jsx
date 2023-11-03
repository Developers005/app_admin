import { createSignal, onMount } from "solid-js"
import Form from "../components/Form"
import axios from "axios"
import { authFetch } from "../axios"
import { successToast, errorToast, oopsToast } from "../toast"

const data = [
  {
    placeholder:"Rfid/Rollno",
    type:"text",
    ref: 'roll'
  },
  {
    placeholder:"Amount",
    type:"text",
    ref: 'amount'
  }
]

function Recharge() {
  const [loading, setLoading] = createSignal(false)

  const refs = {
    roll: '',
    amount: ''
  }



  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const rollno = refs.roll.value;
    const rechargeamount = refs.amount.value;
    try {
      const res = await authFetch.post('/recharge', { rollno, rechargeamount });
      const data = await res.data;
      if (data.message.toLowerCase() === 'success') {
        successToast('Recharge Successful');
      } else {
        oopsToast(data.message)
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      refs.roll.blur();
      refs.amount.blur();
      refs.roll.value = '';
      refs.amount.value = '';
      setLoading(false);
    }
  }
  return (
    <div class="h-full w-full grid place-items-center">
      <Form array={data} refs={refs} submit={submit} loading={loading} />
    </div>
  )
}

export default Recharge