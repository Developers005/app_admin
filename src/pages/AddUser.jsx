import { createSignal } from "solid-js"
import Form from "../components/Form"

const data = [
  { placeholder:"Rollno", type:"text", ref: 'roll' },
  { placeholder:"Name", type:"text", ref: 'name' }
]

function AddUser() {
  const [loading, setLoading] = createSignal(false);
  const refs = { roll: '', name: '' }
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
      <Form array={data} refs={refs} submit={submit} loading={loading}/>
    </div>
  )
}

export default AddUser