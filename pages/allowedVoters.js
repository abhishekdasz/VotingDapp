import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

// INTERNAL IMPORT
import { VotingContext } from '@/context/Voter';
import Style from '../styles/allowedVoter.module.css';
// import images
import Button from '../components/Button/Button';
import Input from '@/components/Input/Input';

const allowedVoters = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({
        name:"", 
        address:"",
        position:"",
    })
    const router = useRouter();
    const { uploadToIPFS } = useContext(VotingContext);
    
    // Voters Image Drop
    const onDrop = useCallback(async(acceptedFil) => {
        const url = await uploadToIPFS(acceptedFil[0]);
        setFileUrl(url);
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    })

  return (
    <div>
      
    </div>
  )
}

export default allowedVoters
