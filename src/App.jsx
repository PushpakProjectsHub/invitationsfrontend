import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import getapilink from './config'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [data,setData] = useState('')
  const [invitaions,setInvitations]=useState([]);

  useEffect(()=>{
    async function fetch_data(){
      console.log('calling useEffect');
      const response = await axios.get(getapilink('/hello'));
      setData(response.data)
      const response2=await axios.get(getapilink("/invitationcards"));
      setInvitations(response2.data);
      console.log(response2.data);
    }
    fetch_data()
  },[])

  

  return (

    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {invitaions.map((card,index)=>{
       return (<div key={index}> <img src={card.image_url}/>
         <h1>{card.name}</h1>
         </div>)
      })}
     
      
      <div className="card">
        <h1>{data}</h1>
        <button onClick={async() => {
          const newCount = count+1;
          setCount(newCount);
          const res= await axios.post(getapilink("/count"),{count:newCount});
          console.log(res)
        }
        }>
          count is {count}
        </button>
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
