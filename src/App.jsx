import { useState } from 'react'


import Chatbot from './components/Chatbot.jsx'
import './App.css'
import babylonLeafLogo from './assets/babylon_leaf.png';
import Button from '@mui/material/Button';



function App() {

  return (
    <>
    <div className='header'>
      <img src={babylonLeafLogo}></img>
      <h2><a style={{color: '#004258'}} href='https://babylonmicrofarms.com' target='_blank'>BABYLON MICROFARMS GALLERI SUPPORT</a> </h2>
    </div>

      <h3>Powered by ChatGPT</h3>
      <Chatbot></Chatbot>
    <div>
    
    </div>
    
    
      


      
     
    </>
  )
}

export default App
