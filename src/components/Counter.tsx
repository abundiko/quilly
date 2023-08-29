import React, { useEffect, useState } from 'react'

type CounterProps = {
  start?: number;
  end: number;
}

const Counter = ({start=0, end}:CounterProps) => {
  const count = useCounter(start, end);

  
  return (
    <>{
      count
    }</>
  )
}

export default Counter


export function useCounter(start = 0, end:number) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (end && count < end) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 3000 / (end - start));
      return () => clearInterval(timer);
    }
  }, [count, end, start]);

  return count;
}
