import { useState } from 'react'


import Chatbot from './components/chatbot.jsx'
import './App.css'
import babylonLeafLogo from './assets/babylon_leaf.png';




function App() {

  return (
    <>
    <div className='header'>
      <img src={babylonLeafLogo}></img>
      <h2><a style={{color: '#004258'}} href='https://babylonmicrofarms.com' target='_blank'>BABYLON GALLERI SUPPORT</a> </h2>
    </div>

      <h3>Powered by ChatGPT</h3>
      <Chatbot>
      
      </Chatbot>
    
    

    
    
    
    
      


      
     
    </>
  )
}

export default App
