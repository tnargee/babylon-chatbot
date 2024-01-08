import { useState } from 'react'


import Chatbot from './components/Chatbot.jsx'
import './App.css'
import babylonLeafLogo from './assets/babylon_leaf.png';



function App() {

  return (
    <>
    <div className='header'>
      <img src={babylonLeafLogo}></img>
      <h2>BABYLON MICROFARMS GALLERI SUPPORT</h2>
    </div>

      <h3>Powered by ChatGPT</h3>
      <Chatbot></Chatbot>

      
     
    </>
  )
}

export default App
