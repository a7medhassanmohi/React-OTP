import React,{ChangeEventHandler, useState} from 'react'
import OtpInput from './OtpInput'

type Props = {}

const PhoneOtpLogin = (props: Props) => {
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [ShowOtp, setShowOtp] = useState(false)
    const handlePhoneNumber=(e:React.ChangeEvent<HTMLInputElement>)=>{
setPhoneNumber(e.target.value)

    }


const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()

// validation
const regex=/[^0-9]/g;
if(PhoneNumber.length<10 || regex.test(PhoneNumber)){
    setShowOtp(true)
}

}

const handleOtpSubmit=(otp:string)=>{

}

  return (
    <div>
        {!ShowOtp?( <form onSubmit={handleSubmit}>
            <input
            type='text'
            value={PhoneNumber}
            onChange={handlePhoneNumber}
            placeholder='Enter Phone Number'
            />
            <button type='submit'>submit</button>
        </form>):(
            <div>
                <p> enter otp sent to {PhoneNumber} </p>
                <OtpInput length={4} onOtpSubmit={handleOtpSubmit}/>

            </div>
        )}
       
    </div>
  )
}

export default PhoneOtpLogin