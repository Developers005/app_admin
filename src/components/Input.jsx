import { onMount } from "solid-js"

function Input(props) {
  console.log(props.data)
  const VARIANTS = {
    input: `
    w-[350px] h-[50px] rounded-lg
    p-0 relative
    `,
    inputBox: `
      h-full w-full 
      focus:outline-none 
      pl-5 rounded-xl border-[2px] hover:border-blue-500
      text-lg
    `,
    image: `
      file:bg-black file:text-white file:px-5 file:py-2 file:rounded-md file:cursor-pointer file:hover:bg-opacity-80
    `
  }
  let label;
  onMount(() => {
    if (String(props.data.value) !== 'undefined') {
      props.refs[props.data.ref].value = String(props.data.value)
      label.style.transform = 'translateY(-120%)'
      props.refs[props.data.ref].style.borderColor = 'rgb(59 130 246)'
      props.refs[props.data.ref].focus()
    }
    if (props.type !== 'file') {
      props.refs[props.data.ref]?.addEventListener('focus', () => {
        label.style.transform = 'translateY(-120%)'
        props.refs[props.data.ref].style.borderColor = 'rgb(59 130 246)'
      });
      props.refs[props.data.ref]?.addEventListener('blur', () => {
        if (!props.refs[props.data.ref]?.value) {
          label.style.transform = 'translateY(0%)'
          props.refs[props.data.ref].style.borderColor = 'rgb(220 220 220)'
        }
      });
    }
  })
  return (
    <>
    {
      props.type !== 'file'
      ?
      <div class={VARIANTS.input}>
        <input 
          type={props.type} ref={props.refs[props.data.ref]} 
          class={VARIANTS.inputBox}
          autoComplete="off"
        />
        <label ref={label} class="absolute top-[30%] left-5 px-2 transition-transform duration-200 ease-out pointer-events-none bg-white">{props.data.placeholder}</label>
      </div>
      :
      <input 
        type={props.type} ref={props.refs[props.data.ref]} 
        class={VARIANTS.image}
        autoComplete="off"
      />
    }
    </>
  )
}

export default Input
     