import React, { useState } from 'react'
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
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate);
    // end of candidate data

    const [error, setError] = useState('');
    const highestVote = [];

    // Voter Section
    const pushVoter = [];
    const [voteArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]); 

    // connecting METAMASK
    const checkIfWalletIsConnected = async() =>{
      if(!window.ethereum) return setError("Please Install Metamask");

      const account = await window.ethereum.request({method: "eth_accounts"});
      
      if(account.length)
      {
        setCurrentAccount(account[0]);
      }
      else
      {
        setError("Please Install Metamask & Connect, Reload");
      }
    };

    // connect wallet
    const connectWallet = async () => {
      if(!window.ethereum) return setError("Please Install Metamask");
      const account = await window.ethereum.request({method: "eth_requestAccounts"});
      setCurrentAccount(account[0])
    }

    // upload to IPFS voter image
    const uploadToIPFS = async(file) => {
      try{
        const added = await client.add({content: file});

        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        return url;
      } catch(error) {

      }
    }

    return (
        <VotingContext.Provider value={{votingTitle, checkIfWalletIsConnected, connectWallet}}>
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
