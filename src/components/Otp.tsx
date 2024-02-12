import React, {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type RefTypes=RefObject<
HTMLButtonElement | HTMLDivElement | HTMLAnchorElement
>
type SubmitType = {
  values: string;
  valuesAsArray: string[];
  inputRefs: React.MutableRefObject<HTMLInputElement[]>;
  reset: (x?: { index: number; value: string }) => void;
};

type Props = {
  numberOfInputs: number;
  onSubmit?: (x: SubmitType) => void;
  submitAutomaticAfterInputsFilled?: (x: SubmitType) => void;
  ContainerClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  inputClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  renderSeparator?: ReactNode;
  isDisabled?: boolean;
  placeHolder?: (inputNumber: string) => string | undefined;
  onChange?: (x: Omit<SubmitType,"reset">) => void;
  onKeyDown?: (
    x: Omit<
    Omit<SubmitType,"reset"> & { index: number; key: string },
      "values" | "valuesAsArray"
    >
  ) => void;
  onKeyUp?: (x: Omit<SubmitType,"reset"> & { index: number; key: string }) => void;
  onFocus?: (x: Omit<SubmitType,"reset"> & { index: number }) => void;
  onBlur?: (x: Omit<SubmitType,"reset"> & { index: number }) => void;
  shouldAutoFocus?: boolean;
  submitBtnRef?: RefTypes;
  onReset?:(x:{reset: (obj?: {
    index: number;
    value: string;
}) => void})=>void
  ResetBtnRef?: RefTypes;
  passwordType?:boolean
};

const Otp = ({
  onSubmit = () => {},
  numberOfInputs = 1,
  renderSeparator,
  isDisabled = false,
  placeHolder=()=>"",
  ContainerClassName = "",
  inputClassName = "",
  onChange = () => {},
  submitBtnRef,
  ResetBtnRef,
  shouldAutoFocus = true,
  submitAutomaticAfterInputsFilled = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onReset=()=>{},
  passwordType=false
}: Props) => {
  if (numberOfInputs <= 0) {
    throw new Error("numberOfInputs must be great than 0");
  }

  
  const [Otp, setOtp] = useState(new Array(numberOfInputs).fill(""));
  const reset = (obj?: { index: number; value: string }) => {
    if (obj) {
      if (obj.index > Otp.length - 1) return;
      setOtp((prev) => {
       const otp=Otp.slice()
       const trimedValue=obj?.value?.split("").filter((c)=>!isNaN(+c) && !!c.trim()).join("").trim();
       if(!trimedValue || isNaN(+trimedValue)){
        otp[obj.index]=""
        return otp
       } 
       otp[obj.index] = trimedValue[trimedValue.length-1];
        return otp;
      });
    } else {
      setOtp(new Array(numberOfInputs).fill(""));
    }
  };
 
  const inputRefs = useRef<HTMLInputElement[]>([]);
  function getInputsValues(){
    if(inputRefs.current.length){
      return inputRefs.current.map((i)=>i.value)
    }
    return new Array(numberOfInputs).fill("")
  }
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (isNaN(+value)) return;
    const newOtp: string[] = [...Otp];

    /* allow only one input */
    newOtp[i] = value.substring(value.length - 1);

    setOtp(newOtp);

    /* submit trigger */
    const combineOtp = newOtp.join("");
    onChange({ values: combineOtp, valuesAsArray: newOtp, inputRefs });
    if (combineOtp.length === numberOfInputs) {
      submitAutomaticAfterInputsFilled({
        values: combineOtp,
        valuesAsArray: newOtp,
        inputRefs,
        reset,
      });
    }

    /* move cursol to next input if current field is filled */

    if (value && i < numberOfInputs - 1 && inputRefs.current[i + 1]) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleClick = (i: number) => {
    inputRefs.current[i].setSelectionRange(1, 1);
    const otpBeforeCurrentIndexEmpty = Otp.some(
      (item, index) => !item && index < i
    );

    //     if (i > 0 && otpBeforeCurrentIndexEmpty) {
    //   inputRefs.current[Otp.indexOf("")].focus();
    // }
  };

  const handleKeyUp = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !Otp[i] && i > 0 && inputRefs.current[i - 1]) {
      inputRefs.current[i - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0] && shouldAutoFocus) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    function handleSubmit() {
      onSubmit?.({
        values: Otp.join(""),
        valuesAsArray: Otp,
        inputRefs,
        reset,
      });
    }
    if (submitBtnRef) {
      submitBtnRef.current?.addEventListener("click", handleSubmit);
    }
    return () => {
      submitBtnRef?.current?.removeEventListener("click", handleSubmit);
    };
  }, [Otp]);

  useEffect(() => {
    function handleReset(){
      onReset({reset})
      
    }

    if (ResetBtnRef) {
      ResetBtnRef.current?.addEventListener("click", handleReset);
    }
    return () => {
      ResetBtnRef?.current?.removeEventListener("click", handleReset);
    };
  }, [Otp]);


  return (
    <>
      <div className={`otp_inputContainer ${ContainerClassName}`}>
        {Otp.map((value, i) => {
          return (
            <div className="otp_input_item" key={i}>
              <input
                ref={(input) => {
                  inputRefs.current[i] = input as HTMLInputElement;
                }}
                type={passwordType?"password":"text"}
                value={value}
                onChange={(e) => handleChange(i, e)}
                onClick={() => handleClick(i)}
                onKeyUp={(e) => {
                  handleKeyUp(i, e);
                  onKeyUp({
                    index: i,
                    key: e.key,
                    inputRefs,
                    values: Otp.join(""),
                    valuesAsArray: getInputsValues(),
                  });
                }}
                className={`otp_input ${inputClassName}`}
                disabled={isDisabled}
                {...(placeHolder
                  ? { placeholder: placeHolder(`${i + 1}`) }
                  : {})}
                {...(onKeyDown
                  ? {
                      onKeyDown: (e) =>
                        onKeyDown({ index: i, key: e.key, inputRefs }),
                    }
                  : {})}
                {...(onFocus
                  ? {
                      onFocus: () =>
                        onFocus({
                          index: i,
                          inputRefs,
                          values: getInputsValues().join(""),
                          valuesAsArray: getInputsValues(),
                        }),
                    }
                  : {})}
                {...(onBlur
                  ? {
                      onBlur: () =>
                        onBlur({
                          index: i,
                          inputRefs,
                          values: getInputsValues().join(""),
                          valuesAsArray: getInputsValues(),
                        }),
                    }
                  : {})}
              />
              <div className="otp_separator_container">
                {renderSeparator && renderSeparator}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Otp;