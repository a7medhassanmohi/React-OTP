import { RefObject, useRef } from "react";
import "./App.css";
import Otp from "./components/Otp";
import PhoneOtpLogin from "./components/PhoneOtpLogin";
function App() {
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="app">
        {/* <PhoneOtpLogin/> */}
        <Otp
          onSubmit={() => {
            
          }}
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
          submitBtnRef={btnRef}
          ContainerClassName="border_red"
          inputClassName="red_input"
          onChange={() => {
            // console.log({inputRefs,values,valuesAsArray});
            // console.log(values,refs);
          }}
          shouldAutoFocus={true}
        />
        <button ref={btnRef}>click</button>
      </div>
    </>
  );
}

export default App;
