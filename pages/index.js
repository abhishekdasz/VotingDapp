import React, { useContext } from 'react'

// Internal Import 
import { VotingContext } from '@/context/Voter'

const index = () => {
  const {votingTitle} = useContext(VotingContext)
  return (
    <div>
      Hello World {votingTitle}
    </div>
  )
}

export default index
