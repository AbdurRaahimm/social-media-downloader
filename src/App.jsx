import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import tailwindLogo from '/tailwindLogo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log(count); 
  return (
    <div className=''>
      <div className='flex justify-center'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo " alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react " alt="React logo" />
        </a>
        <a href="https://tailwindcss.com/docs" target="_blank">
          <img src={tailwindLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold text-green-500">Vite + React + Tailwind</h1>
      <div className="card">
        <button className='border-4 bg-indigo-500  focus:outline-none' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className='text-gray-900 py-2'>
        <a className='text-green-500 capitalize' href="https://www.showwcase.com/abdurrahim" target="_blank">
         created Starter by @Sayed Abdur Rahim
        </a>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and Tailwind logos to learn more
      </p>
    </div>
  )
}

export default App
