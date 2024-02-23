
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




 
    const [inputValue, setInputValue] = useState('');
    const [dataArray, setDataArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const[N,setN] = useState('')
    const[M,setM] = useState('')
    const[plainText,setplainText] = useState('')
    const[splitText,setsplitText] = useState([])
  const[pKey,setpKey] = useState([])
  const [result, setResult] = useState([]);
  const[multiplicativeInverse,setmultiplicativeInverse] = useState('')
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleInputN = (event) => {
      setN(event.target.value);
    };
    const handleInputM = (event) => {
      setM(event.target.value);
    };
    const handleInputPT = (event) => {
      setplainText(event.target.value);
    };


    const clearErrorMessage = () => {
      setErrorMessage('');
    };
  
    const validateInputAndSetData = () => {
      const values = inputValue.split(',').map(val => parseInt(val.trim(), 10));
      let isValid = true;
      for (let i = 1; i < values.length; i++) {
        if (values[i] <= values.slice(0, i).reduce((sum, val) => sum + val, 0)) {
          isValid = false;
          break;
        }
      }
let x;
      const smallerNumber = Math.min(M, N);
      for (let i = 2; i <= smallerNumber; i++) {
        if (M % i === 0 && N % i === 0) {
       x = true; // Common factor found
        }


      if (isValid) {
        setDataArray(values);
        setErrorMessage('');
      } else {
        setDataArray([]);
        setErrorMessage('Input is not a super increasing sequence!');
      }

      if(x){
      
        setN('')
        setErrorMessage('N has common factor with M!');
      }

    if(inputValue[inputValue.length]>=M){
      setM('')
      setErrorMessage('M is not greater than sum of private key!');
    }

    const substrings = [];
    for (let i = 0; i < plainText.length; i += dataArray.length) {
      substrings.push(plainText.substring(i, i + dataArray.length)?plainText.substring(i, i + dataArray.length):'0');
    }

    setsplitText(substrings);

    //calculating public key


 
    };
    calculatePublicKey()


  calculateResult()
  
  }
  

 
    let totalSum = []; // Initialize totalSum as an array to hold individual sums
    
    // Calculate the result
    const calculateResult = () => {
      for (let i = 0; i < splitText.length; i++) {
    

        const splitIntArray = splitText[i].split("").map(Number); // Convert splitText to an array of integers
    
        let s = 0; // Initialize s to hold the sum of the current calculation
        for (let j = 0; j < pKey.length; j++) {
          s += pKey[j] * (splitIntArray[j]?splitIntArray[j]:0); // Calculate the current sum
        }
        totalSum.push(s); // Push the current sum to the totalSum array
      
      }
      setResult(totalSum);
    };
      


    const calculatePublicKey = () => {
      const newPublicKey = dataArray.map(value => value % M);
      setpKey(newPublicKey);
    };


    function modInverse(n, m) {
      let a = n;
      let b = m;
      let [oldR, r] = [a, b];
      let [oldS, s] = [1, 0];
      let [oldT, t] = [0, 1];
    
      while (r !== 0) {
        const quotient = Math.floor(oldR / r);
        [oldR, r] = [r, oldR - quotient * r];
        [oldS, s] = [s, oldS - quotient * s];
        [oldT, t] = [t, oldT - quotient * t];
      }
    
      // Ensure that the result is positive
      const result = oldS < 0 ? oldS + m : oldS;
      return result;
    }
    






    const decrypt = ()=>{

      //calculating multiplicative inverse 
      let x = modInverse(N, M)
      setmultiplicativeInverse(x);

    }


    function multiplyAndMod(cipherText, number, m) {
      return (cipherText * number) % m;
  }

  function numberToBinaryWithSum(number, privateKey) {
    let binaryString = '';
    let sum = 0;

    for (let i = privateKey.length - 1; i >= 0; i--) {
        if (sum + privateKey[i] <= number) {
            binaryString = '1' + binaryString;
            sum += privateKey[i];
        } else {
            binaryString = '0' + binaryString;
        }
    }

    return binaryString;
}

const results = result.map(cipherText => {
  const result = multiplyAndMod(cipherText, multiplicativeInverse, M);
  return numberToBinaryWithSum(cipherText, pKey);
});

results.forEach((binaryString, index) => {
  console.log(`Result for cipher text ${result[index]}: ${binaryString}`);
});
    return (
<>

<div className=" container">
    <h3 className=''>Enter Private Key here</h3>
  <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter comma-separated values"
        className="form-control"
      />
    
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      
    </div>
   
    <input
        type="text"
        value={N}
        onChange={handleInputN}
        placeholder="Enter N"
        className="form-control"
      />
            <input
        type="text"
        value={M}
        onChange={handleInputM}
        placeholder="Enter M"
        className="form-control"
      />
          <input
        type="text"
        value={plainText}
        onChange={handleInputPT}
        placeholder="Enter Plaintext"
        className="form-control"
      />
</div>
<button className="btn btn-primary my-2  m-1" onClick={validateInputAndSetData}>Submit</button>
       <button className="btn btn-primary my-2  m-1" onClick={clearErrorMessage }>Clear Text</button>
       <div className="container my-3">
       {dataArray.length > 0 && (
        <div>
          <h2>Private Key:
          
       
            {'  { '}
            {dataArray.map((value, index) => (
              <span key={index}>
                {value}
                {index !== dataArray.length - 1 ? ',' : ''}
              </span>
            ))}
            {' }'}
          
          </h2>
        </div>
      )}

<h2>Public Key:
          
       
          {'  { '}
          {pKey.map((value, index) => (
            <span key={index}>
              {value}
              {index !== pKey.length - 1 ? ',' : ''}
            </span>
          ))}
          {' }'}
        
        </h2>
        <h2>Encrypting...</h2>
        <ul>
       
          {result.map((value, index) => (
            <li key={index}>
              {splitText[index] + ' x '+"Private Key" + ' = ' + value}
            </li>
          ))}
        
        </ul>
        <h2 style={{color:'red'}}>Cipher Text = 
        {result && (result.map((value, index) => (
            <span key={index}>
              {" "+value+" "}
              </span>
          )))}
          </h2>
          <button className="btn btn-primary my-2  m-1" onClick={decrypt}>Decrypt</button>

  <h2>{"Multiplicative Inverse: "+multiplicativeInverse}</h2>
<h3>Decrypting.....</h3>
<div>
        {results.map((binaryString, index) => (
          <p key={index}>Result for cipher text {result[index]}: {binaryString}</p>
        ))}
      </div>

      <h2 style={{color:'green'}}>{"Plain text: "+results}</h2>
</div>
</>



)}


