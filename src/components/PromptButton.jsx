import Button from '@mui/material/Button';
import './PromptButton.css'
import ChatBotImage from '../assets/BMF_IMG.png'

export const PromptButton =() => {
    return (
        <div>
    <img className='chatbotimage'
    src={ChatBotImage}></img>
       
    <h1 style={{fontSize: "2.0rem"}}>How can I help you today?</h1>

    
    <Button variant='contained' 
        style={{backgroundColor: '#004258'}} 
        sx={{height: "70px", 
        width: "300px",
        borderRadius: "20px", marginLeft: "0px", 
        textTransform: "none", flexDirection: 'column'}} 

    size='small'>Why is the company called Babylon?</Button>
    <Button variant='contained' 
        style={{backgroundColor: '#004258'}} 
        sx={{height: "70px", 
        width: "300px",
        borderRadius: "20px", marginLeft: "20px",  
        textTransform: "none", gap: "100px", 
        alignItems: 'center', flexDirection: 'column'}} 

    size='small'>How much work is involved in growing?</Button>
    <div aria-orientation='vertical'>
    <Button variant='contained' 
        style={{backgroundColor: '#004258'}} 
        sx={{height: "70px", 
        width: "300px",
        borderRadius: "20px", marginLeft: "0px",  
        textTransform: "none", flexDirection: 'column', marginTop: "20px"}} 

    size='small'>How do the Micro-Farms work?</Button>
    
    
    <Button variant='contained' 
    style={{backgroundColor: '#004258'}} 
    sx={{height: "70px", 
    width: "300px",
    borderRadius: "20px", marginLeft: "20px",  
    textTransform: "none", flexDirection: 'column', marginTop: "20px"}} 

    size='small'>What kinds of plants can grow in my micro-farm?</Button>
    </div>
    </div>
    

    )
}