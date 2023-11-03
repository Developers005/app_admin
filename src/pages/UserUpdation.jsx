import { createSignal } from "solid-js";
import Form from "../components/Form";
import { authFetch } from "../axios";
import { successToast, errorToast, oopsToast } from "../toast";

const data = [
  {
    placeholder:"Rfid",
    text:"text",
    ref: 'rfid'
  },
  {
    placeholder:"Roll",
    text:"text",
    ref: 'roll'
  }
]

function UserUpdation() {
  const [loading, setLoading] = createSignal(false);
  const refs = {
    roll: '',
    rfid: ''
  }
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const rfid = refs.rfid.value;
    const rollno = refs.roll.value;
    try {
      const res = await authFetch.post('/rfid/activation', { rfid, rollno });
      const data = await res.data;
      console.log(data);
      if (data.message?.toLowerCase() === 'success') {
        successToast('Successfully Activated')
      } else {
        oopsToast(data.message)
      }
    } catch (error) {
      errorToast(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div class="h-full w-full grid place-items-center">
      <Form array={data} refs={refs} submit={submit} loading={loading} />
    </div>
  )
}

export default UserUpdation