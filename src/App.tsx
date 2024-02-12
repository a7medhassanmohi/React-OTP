import { RefObject, useRef } from "react";
import "./App.css";
import Otp from "./components/Otp";
import PhoneOtpLogin from "./components/PhoneOtpLogin";
function App() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="app">
        <Otp
        placeHolder={(n)=>""}
        
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
            reset({index:1,value:"luiui64hhh"})
          }}
          ResetBtnRef={resetRef}
        />
        <button ref={btnRef}>
          submit
        </button>
        <button ref={resetRef}>
          reset
        </button>
      </div>
    </>
  );
}

export default App;
