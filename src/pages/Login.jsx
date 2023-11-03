import Form from "../components/Form"
import { createSignal } from "solid-js"
import { authFetch } from "../axios"
import { errorToast, oopsToast, successToast } from "../toast"

const data = [
  {
    placeholder:"Email",
    type:"text",
    ref: 'email'
  },
  {
    placeholder:"Password",
    type:"password",
    ref: 'password'
  }
]

const Login = (props) => {
  const [loading, setLoading] = createSignal(false)
  const refs = {
    email: '',
    password: ''
  }
  
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const password = refs.password.value;
    const email = refs.email.value;
    try {
      const res = await authFetch.post('/admin/login', { email, password })
      const data = await res.data;
      if (data.message.toLowerCase() === 'success') {
        successToast('Login Successful')
        localStorage.setItem('accessToken', data?.accessToken);
        localStorage.setItem('refreshToken', data?.refreshToken);
        setTimeout(() => {
          location.pathname='/'
          props.setIsAuthorized(true);
        }, 2000)
      } else {
        oopsToast(data.error);
      }
    } catch (error) {
      errorToast(error.error);
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

export default Login