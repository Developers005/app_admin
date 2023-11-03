import { onMount } from "solid-js"

const VARIANTS = {
  input: `
  w-[50%] h-[50px] rounded-lg
  p-0 relative
  `,
  inputBox: `
    h-full w-full 
    focus:outline-none 
    pl-5 rounded-xl border-[2px] hover:border-blue-500
    text-lg
  `
}

const CategoryInput = (props) => {

  let label;
  onMount(() => {
    console.log(props.refs[props.data.ref])
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
  })

  return (
    <div class={VARIANTS.input}>
      <input 
        type={'text'} ref={props.refs[props.data.ref]} 
        class={VARIANTS.inputBox}
        autoComplete="off"
      />
      <label ref={label} class="absolute top-[30%] left-5 px-2 transition-transform duration-200 ease-out pointer-events-none bg-white">{props.data.placeholder}</label>
    </div>
  )
}

export default CategoryInput