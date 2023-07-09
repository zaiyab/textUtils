import react,{ useState } from "react";
import Navbar from "./Components/Navbar";
import Textbox from "./Components/Textbox"
import About from "./Components/About"
import Alert from "./Components/Alert";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [mode,setMode]= useState('dark');
  const [alert,setAlert]= useState(null);

  const showAlert = (message,type)=>{
    setAlert({msg:message,type:type})
    setTimeout(() => {
   setAlert(null)
}, 3000);
  }

  const toggleMode = ()=>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor="#212529";
      document.body.style.color = 'white';
      showAlert("Dark mode has enbled",'success');
    }else{
      setMode("light")
      document.body.style.backgroundColor="white";
      document.body.style.color = 'black';
      showAlert("Light mode has enbled",'success');

    }
  }
  return (
  
<>



<BrowserRouter>

<Navbar title="TextUtils" about="About us" mode={mode} toggleMode={toggleMode}/>
<Alert Alert={alert}/>
<div className="container my-3 ">
    <Routes>
          <Route path="/" element={   <Textbox Alert={showAlert} h1="Enter your text here"   />}/>
  
          <Route  path="/about" element = { <About />}/>
      
    
        </Routes>
 </div>
   </BrowserRouter>


</>
  );
}

export default App;
