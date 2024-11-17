import React, { useState } from 'react'

const useQuizSession = () => {
  const [turn,setTurn] = useState(false);

  const handleToggle = () => setTurn(!turn);
  
 

  return {
    turn,
    handleToggle
  }
}

export default useQuizSession