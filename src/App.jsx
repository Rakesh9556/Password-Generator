import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook --> for password copy
  const passRef = useRef(null)


  // generate password
  // useCall back is used to optimize the code make the varibale in cache memory
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$&*?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])  //  ethi asabu dependency use heichi jaugudaka password generate bele darkar hue


// Password copy to clipboard

// 1st method
// const copyPassToClipboard = useCallback( () => {
//   // as we are using core react we can use window object directly
//   window.navigator.clipboard.writeText(password)
// }, [password])

// 2nd method
const copyPassToClipboard = useCallback( () => {
  // to give user accessibilty
  passRef.current?.select();
  // passRef.current?.setSelectionRange(0, 3);  // select range

  // as we are using core react we can use window object directly
  window.navigator.clipboard.writeText(password)
}, [password])

  // useEffect hook

  useEffect(() => {
    passwordGenerator()

  }, [length, numAllowed, charAllowed, passwordGenerator])  // ethi jadi asabu dependecncy re kichhi bi chnage hela tahale password generator ku au thare call karidia

  return (
    <>
    <div className='w-4/5 maw-w-md mx-auto shadow-md rounded-lg bg-gray-600 px-4 py-3 my-8 text-orange-700'>
      <img className='mx-auto h-12 w-12 md:w-24 md:h-24' src="./src/assets/passwordIcon.png" alt="hello" />
      <h1 className='text-xl md:text-4xl font-bold text-center my-8'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 h-10 md:h-14'>
        <input type="text"
        value={password}
        className ="outline-none w-full py-1 px-2"
        placeholder='Generate password here'
        readOnly 
        // a input field ra refference naba pain ame "ref" use kariba and useRef variable ku pass karidaba
        ref={passRef}
        />

        <button 
        onClick={copyPassToClipboard}
        className='text-lg md:text-2xl bg-blue-700 outline-none p-2 font-extrabold text-center'>
          Copy
        </button>

      </div>

      <div className="md:flex text-sm gap-x-4">
        <div className="flex items-center gap-x-1 mb-4 md:mb-1">
          <input 
          id="range"
          type="range"
          min={6}
          max={20}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          className='cursor-pointer' />  
          <label htmlFor="range" className='text-sm md:text-2xl p-1 md:p-4 font-extrabold'>Length:<span className='text-blue-700 text-xl md:text-4xl md:p-4font-extrabold'> {length}</span></label>
        </div>

        <div className='flex justify-between'>
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox"
              id='numberInput'
              defaultChecked = {numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev)  // prev is the preivious value that is (true) that will be reversed means (false)
              }}
              className='cursor-pointer' />
              <label htmlFor="numberInput" className='text-sm md:text-2xl p-1 md:p-4 font-extrabold'>Numbers</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox"
              id='charInput'
              defaultChecked = {charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)  // prev is the preivious value that is (true) that will be reversed means (false)
              }}
              className='cursor-pointer ' />
              <label htmlFor="charInput" className='text-sm md:text-2xl p-1 md:p-4 font-extrabold'>Characters</label>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
