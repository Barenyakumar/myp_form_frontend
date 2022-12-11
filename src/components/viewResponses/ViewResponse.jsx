
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ViewResponse() {
  const [responses, setResponses] = useState()
  async function getAllRes() {
    const res = await axios.get("/api/response/all");
    setResponses(res.data)
  }
  useEffect(() => {
    getAllRes()
  }, [])
  
  return (
    <div>{
      responses?.map(res => (
        <div>{JSON.stringify(res) }</div>
      ))
    }</div>
  )
}

export default ViewResponse