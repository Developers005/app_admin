function Report() {
  return (
    <div class="h-full w-full flex justify-center items-center">
      <input type="date" onChange={e => console.log(e.target.value)}/>
    </div>
  )
}

export default Report