import { createSignal } from "solid-js"
import Form from "../components/Form"

const data = [
  {
    placeholder:"Rfid/Rollno",
    type:"text",
    ref: 'roll'
  }
]


function RFIDActivation() {
  const [loading, setLoading] = createSignal(false);

  const refs = {
    roll: ''
  }
  const submit = (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }
  return (
    <div class="h-full w-full grid place-items-center">
      <Form array={data} submit={submit} refs={refs} loading={loading} />
    </div>
  )
}

export default RFIDActivation