import './App.css'
import React from 'react'


function App() {

  const inp=React.useRef()
  const [text,setText]= React.useState("")
  const [start,setstart]=React.useState({stat:false,
    counter:15,
  })

  /**start game function */
  function go(){
    setstart(prev =>( {...prev,stat:!prev.stat}))  
  }

/* restart game function*/
 function restart(){
  setstart({stat:false,
    counter:val.current.value,
  })
  setText("")
 }
/*add counter first render */
const val = React.useRef()
React.useEffect(()=>{
  val.current.value=start.counter
},[])

/*count down function*/ 
React.useEffect(()=>{
  if(start.stat && start.counter){
    setTimeout(()=>{
      setstart(prev=>({...prev,counter:start.counter-1}))
    },1000)
  }
  inp.current.focus()
},[start])


  return (
    <>
    
      <div className="container">
      <h3>speed typing game</h3>
        <textarea className="text" value={text}
        ref={inp}
        disabled={!start.stat || !start.counter}
        onChange={(e)=> setText(e.target.value)}
        />
        <div style ={{display:'flex',gap:"10px",alignItems:"center"}}>
        <label htmlFor="in">change seconds</label>
        <input id="in" type="text" ref={val}
        
        style={{padding:"5px",width:"40px", aspectRatio:"1/1"}}
        disabled={start.stat}
        placeholder='sec'
         onChange={(e)=>{setstart({...start,counter:e.target.value==""?start.counter:e.target.value})} }/>
        </div>
        
        {!start.counter ?
        <button onClick={restart} style={{cursor:"pointer",outline:"none"}}>play again</button>:
        <button onClick={go} style={{cursor:"pointer",outline:"none"}}>
          {start.stat?"stop":"start"}
        </button>}
        <div className="counter">{`the remaining time ${start.counter} sec`}</div>
       {!start.counter && <div className="result"
        >
        {text.trim().split(" ")[0]==""?`you didn't type any thing try again`:` cool! you type ${text.trim().split(" ").length} words in ${val.current.value} sec`}
        </div>}
        
      </div>
    </>
  )
}

export default App
