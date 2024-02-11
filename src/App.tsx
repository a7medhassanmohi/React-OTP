import { RefObject, useRef } from "react";
import "./App.css";
import Otp from "@a7medhassanmohi/react-otp";
import PhoneOtpLogin from "./components/PhoneOtpLogin";
function App() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="app">
        <Otp
        placeHolder={()=>""}
        
        passwordType={false}
          onSubmit={() => {
          }}
          submitBtnRef={btnRef}
          submitAutomaticAfterInputsFilled={()=>{

          }}
          onKeyDown={()=>{
            
          }}
          onKeyUp={()=>{

          }}
          onFocus={()=>{
            
          }}
          onBlur={()=>{
            
          }}
          numberOfInputs={5}
          ContainerClassName="border_red"
          inputClassName="red_input"
          onChange={() => {
          }}
          shouldAutoFocus={true}

          onReset={({reset}) =>{
            reset()
          }}
          ResetBtnRef={resetRef}
          isDisabled
        />
        <button ref={resetRef}>reset</button>
      </div>
    </>
  );
}

export default App;
