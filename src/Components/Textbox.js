
import React ,{useState} from 'react';

export default function Navbar(props) {
    const [text,setText]=useState('');

  const handleUpClick = ()=>{
    setText(text.toUpperCase())
  }
  const handleLoClick = ()=>{
    setText(text.toLowerCase())
  }

  const handleOnChange = (event)=>{
 setText(event.target.value);

  } 
  const handleClear = ()=>{
    props.Alert("Clear text",'primary')
    setText('')
  }
    return (
<>

<div className=" container">
    <h1 className=''>{props.h1}</h1>
  <textarea className="form-control" onChange={handleOnChange} value={text} placeholder='Input text here' id="myBox" rows="8"></textarea>
  <button className="btn btn-primary my-2 m-1" onClick={handleUpClick}>Convert to Uppercase</button>
  <button className="btn btn-primary my-2  m-1" onClick={handleLoClick}>Convert to Lowercase</button>
  <button className="btn btn-primary my-2  m-1" onClick={handleClear}>Clear Text</button>

</div>
<div className="container my-3">
  <h1>Your text summary</h1>
  <p>{text.split(" ").length} words and {text.length} characters</p>
  <p>{text.split(" ").length*0.008} Minustes read</p>
  <h2>Preview</h2>
  <p>{text.length>0?text:'Enter text to preview'}</p>

</div>
</>



)}


