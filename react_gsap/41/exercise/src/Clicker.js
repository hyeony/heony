import { useState, useEffect } from 'react'

export default function Clicker() 
{

  const [count, setCount] = useState(0)

  useEffect( () => {
    console.log('hello')
  },[count] )

  const buttonClick = () =>
  {
    setCount( (value) => value + 1 )
  }

  return <>
    <div>
      Clicker count: {count}
    </div>
    <button onClick = {buttonClick}>Click me</button>
  </>
}