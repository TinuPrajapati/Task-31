import React,{useState} from "react";
import axios from "axios";

function Signup() {
  const [username ,setName] = useState("");
  const [password ,setPassword] = useState("");

  const sendData =async (e)=>{
    try{
       await axios.post("https://task-31-eight.vercel.app/register",{
        username,password
      })
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <h1>Signup</h1>
      <form action="/login" className="border-2 p-10 flex flex-col " onSubmit={sendData}>
        <label htmlFor="name" className="block ">
          Username:
        </label>
        <input
          type="text"
          id="name"
          required
          className="border-2 outline-none text-md"
          onChange={(e)=> setName(e.target.value)}
        />
        <label htmlFor="password" className="block ">
          Password:
        </label>
        <input
          type="password"
          id="password"
          required
          className="border-2 outline-none text-md"
          onChange={(e)=> setPassword(e.target.value)}
        />
        <br />
        
        <button type="submit" className="border-2 py-2 active:scale-90">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
