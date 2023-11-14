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
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
            <div className={Style.voterInfo}>
                <img src={fileUrl} alt='Voter Image'/>
                <div className='{Style.voterInfo_paragraph'>
                    <p>
                        Name: <span> &nbps; {formInput.name} </span>
                    </p>
                    <p>
                        Address: &nbps; <span> {formInput.address.slice(0, 20)} </span>
                    </p>
                    <p>
                        Position: &nbps; <span> {formInput.position} </span>
                    </p>
                </div>
            </div>
        )}
        {
            !fileUrl && (
                <div className={Style.sideInfo}>
                    <div className={Style.sideInfo_box}>
                        <h4> Create candidate For Voting </h4>
                        <p> Blockchain voting organization, provide ethereum ecosystem </p>
                        <p className={Style.sideInfo_para}> Contract Candidate </p>
                    </div>
                    <div className={Style.car}>
                        {/* {VoterArray.map((el, i) => (
                            <div key={i+1} className={Style.card_box}>
                                <div className={Style.image}>
                                    <img src="" alt="Profi" />
                                </div>

                                <div className={Style.card_info}>
                                    <p> Name </p>
                                    <p> Address </p>
                                    <p> Details </p>
                                </div>
                            </div>
                        ))} */}
                    </div>

                    <div className={Style.voter}>
                        <div className={Style.voter_container}>
                            <h1> Create New Voter </h1>
                            <div className={Style.voter_container_box}>
                                <div className={Style.voter_container_box_div}>
                                    <div {...getRootProps()}> 
                                        <input {...getInputProps()} />

                                        <div className={Style.voter_container_box_div_info}>
                                            <p> Upload File: JPG,PNG, GIF, WEBM Max 10MB </p>
                                            <div className={Style.voter_container_box_div_image}>
                                                {/* <Image src={images.creator} width={150} height={150} objectFit='contain' alt='File upload'/> */}
                                            </div>
                                            <p> Drag & Drop File </p>
                                            <p> or Browse Media on your device </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={Style.input_container}>
                            <Input inputType="text" title="Name" placeholder="Name" handleClick={(e) => setFormInput({...formInput, name: e.target.value})} />
                            <Input inputType="text" title="Address" placeholder="Voter Address" handleClick={(e) => setFormInput({...formInput, address: e.target.value})} />
                            <Input inputType="text" title="Position" placeholder="Voter Position" handleClick={(e) => setFormInput({...formInput, position: e.target.value})} />
                        </div>
                        <div className={Style.Button}>
                            <Button btnName="Authorized Voter" handleClick={()=>{}}/>
                        </div>
                    </div>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default allowedVoters
