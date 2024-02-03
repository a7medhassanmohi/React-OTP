import React, { useEffect, useRef, useState } from 'react'

type Props = {
    length:number,
    onOtpSubmit:(x:string)=>void
}

const OtpInput = ({length=4,onOtpSubmit=()=>{}}: Props) => {
    const [Otp,setOtp]=useState(new Array(length).fill(""))
    const inputRefs=useRef<HTMLInputElement[] >([])
    const handleChange=(i:number,e:React.ChangeEvent<HTMLInputElement>)=>{
        
        const value=e.target.value.trim()  
        if(isNaN(+value))return
        const newOtp=[...Otp]

      /* allow only one input */
      newOtp[i]=value.substring(value.length-1)

      setOtp(newOtp)


      /* submit trigger */
      const combineOtp=newOtp.join("")

      if(combineOtp.length===length){
        onOtpSubmit(combineOtp)
      }

    /* move cursol to next input if current field is filled */

    if(value && i< length-1 && inputRefs.current[i+1]){
        inputRefs.current[i+1].focus()
    }

    }
    const handleClick=(i:number)=>{
        inputRefs.current[i].setSelectionRange(1,1)
        const otpBeforeCurrentIndexEmpty=Otp.some((item,index)=>!item && index<i )
        
        if (i > 0 && otpBeforeCurrentIndexEmpty) {
      inputRefs.current[Otp.indexOf("")].focus();
    }

    }
    const handleKeyUp=(i:number,e: React.KeyboardEvent<HTMLInputElement>)=>{
        
        if(e.key==="Backspace" &&  !Otp[i] && i>0 && inputRefs.current[i-1] ){
        inputRefs.current[i-1].focus()
        }

    }
    useEffect(() => {
    if(inputRefs.current[0]){
        inputRefs.current[0].focus()
    }
    }, [])
    
    
  return (
    <div>
        {Otp.map((value,i)=>{
            return <input
            key={i}
            ref={(input) => {
                   inputRefs.current[i]  = input as HTMLInputElement;
            }}
            type='text'
            value={value}
            onChange={(e)=>handleChange(i,e)}
            onClick={()=>handleClick(i)}
            onKeyUp={(e)=>handleKeyUp(i,e)}
            className='otp_input'
            />
        })}
    </div>
  )
}

export default OtpInput