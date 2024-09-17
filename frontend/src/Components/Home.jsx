import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessKey");
    console.log(storedToken)
    if (storedToken) {
      setToken(storedToken);
    }else{
      setMsg("Please Login first and then check data");
    }
  }, [getdata]);

  async function getdata() {
    
    try {
      const respone = await axios.get(`${import.meta.env.VITE_API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg(respone.data);
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <>
    <h1>Welcome</h1>
    <button onClick={getdata} className="border-2 py-2 px-6">Check Data</button>
    {msg && <p>{msg}</p>}
    </>
  );
}

export default Home;
