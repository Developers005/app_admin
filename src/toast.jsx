import toast from "solid-toast";

const options = {
  duration: 1500,
  style: {
    "font-size": '25px',
    position: 'absolute',
    left: '45%',
    "animation-delay": '0ms'
  }
}

export const oopsToast = (message) => toast.error(message, options);

export const successToast = (message) => toast.success(message, options);

export const errorToast = (message) => toast.error(message, options);