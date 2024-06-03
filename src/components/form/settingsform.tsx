const Settingsform = () => {
  return (
    <>
      <form className="flex flex-col mt-12 w-72 ">
       
        <label className="mb-1" htmlFor="email">Name</label>
        <input className="mb-3 rounded " type="text" id="email" name="email" />
        
        <label className="mb-1" htmlFor="email">Email</label>
        <input className="mb-3 rounded" type="text" id="email" name="email" />
        
        <button className="mt-4" type="submit">Submit</button>
        

      </form>
    </>
  );
}

export default Settingsform;