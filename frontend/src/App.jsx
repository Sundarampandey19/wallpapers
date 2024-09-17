import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [array ,setArray ]=useState([])

  async function dosomething(){

    fetch('http://localhost:3002/api/wallhaven')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setArray(data)
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));

  }
  useEffect(()=>{
    dosomething()
  },[])
  return (
    <>
      {JSON.stringify(array)}
    </>
  )
}

export default App
