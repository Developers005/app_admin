import { createSignal } from "solid-js";
import Loading from "../assets/icons/Loading";
import Form from "../components/Form";
import { authFetch } from "../axios";
import { errorToast, oopsToast, successToast } from "../toast";


const data = [
  {
    placeholder: 'Rfid/Roll',
    type: 'text',
    ref: 'rfid'
  }
]

function Home(props) {
  const [loading, setLoading] = createSignal(false);
  const refs = {
    rfid: ''
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(refs.rfid.value);
    try {
      const res = await authFetch.post('/order/admin_user', { userid: refs.rfid.value });
      const data = await res.data;
      console.log(data);
      if (data.message.toLowerCase() === 'success') {
        successToast('success');
        props.setCurrentUser(data.result.rollno);
        props.navigate('/products');
      } else {
        oopsToast(data.error)
      }
    } catch (error) {
      errorToast(error.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div class="h-full w-full grid place-items-center">
      <Form refs={refs} submit={submit} array={data} loading={loading}/>
    </div>
  )
}

export default Home