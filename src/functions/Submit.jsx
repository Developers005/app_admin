import { createSignal } from "solid-js"
import axios from "axios";

export const useFetch = async (path) => {
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.data;
      if (data.message === 'Success') {
        setData(data.data);
      } else if (data.message === 'jwt expired') {

      }
    } catch (error) {
      
    }
  }

  fetchData();

}