import { createEffect } from "solid-js"
import { useNavigate } from "@solidjs/router";
import axios from "axios";
import { authFetch } from "../axios";

const Logout = (props) => {
  const navigate = useNavigate();
  createEffect(async () => {
    const res = await authFetch.post('/admin/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await res.data;
    console.log(data);
    if (data.message) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/')
      props.setIsAuthorized(false)
    }
  })
  return (
    <div class="h-full w-full flex justify-center items-center font-extrabold text-2xl">Loading...</div>
  )
}

export default Logout