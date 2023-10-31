import React from 'react'
import Web3Model from 'web3modal'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import axios from 'axios'
import { useRouter } from 'next/router';

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from './constants'

const client = ipfsHttpClient('htpps://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();
export const VotingProvider = ({children}) =>{
    const votingTitle = 'My first Smart Contract App'
    return (
        <VotingContext.Provider value={{votingTitle}}>
            {children}
        </VotingContext.Provider>
    )
}

const Voter = () => {
  return (
    <div>
      
    </div>
  )
}

export default Voter
