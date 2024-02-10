import React, {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

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
  onChange?: (x: SubmitType) => void;
  onKeyDown?: (
    x: Omit<
      SubmitType & { index: number; key: string },
      "values" | "valuesAsArray"
    >
  ) => void;
  onKeyUp?: (x: SubmitType & { index: number; key: string }) => void;
  onFocus?: (x: SubmitType & { index: number }) => void;
  onBlur?: (x: SubmitType & { index: number }) => void;
  shouldAutoFocus?: boolean;
  submitBtnRef?: RefObject<
    HTMLButtonElement | HTMLDivElement | HTMLAnchorElement
  >;
};

const Otp = ({
  onSubmit = () => {},
  numberOfInputs = 1,
  renderSeparator,
  isDisabled = false,
  placeHolder,
  ContainerClassName = "",
  inputClassName = "",
  onChange = () => {},
  submitBtnRef,
  shouldAutoFocus = true,
  submitAutomaticAfterInputsFilled = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  onFocus = () => {},
  onBlur = () => {},
}: Props) => {
  if (numberOfInputs <= 0) {
    throw new Error("numberOfInputs must be great than 0");
  }
  const [Otp, setOtp] = useState(new Array(numberOfInputs).fill(""));

  const reset = (obj?: { index: number; value: string }) => {
    if (obj) {
      if (obj.index > Otp.length - 1) return;
      setOtp((prev) => {
        prev[obj.index] = obj.value;
        return prev;
      });
    } else {
      setOtp(new Array(numberOfInputs).fill(""));
    }
  };
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (isNaN(+value)) return;
    const newOtp: string[] = [...Otp];

    /* allow only one input */
    newOtp[i] = value.substring(value.length - 1);

    setOtp(newOtp);

    /* submit trigger */
    const combineOtp = newOtp.join("");
    onChange({ values: combineOtp, valuesAsArray: newOtp, inputRefs, reset });
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

  return (
    <>
      <div className={`inputContainer ${ContainerClassName}`}>
        {Otp.map((value, i) => {
          return (
            <div className="input_item" key={i}>
              <input
                ref={(input) => {
                  inputRefs.current[i] = input as HTMLInputElement;
                }}
                type="text"
                value={value}
                onChange={(e) => handleChange(i, e)}
                onClick={() => handleClick(i)}
                onKeyUp={(e) => {
                  handleKeyUp(i, e);
                  onKeyUp({
                    index: i,
                    key: e.key,
                    inputRefs,
                    reset,
                    values: Otp.join(""),
                    valuesAsArray: Otp.slice(),
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
                        onKeyDown({ index: i, key: e.key, inputRefs, reset }),
                    }
                  : {})}
                {...(onFocus
                  ? {
                      onFocus: (e) =>
                        onFocus({
                          index: i,
                          inputRefs,
                          reset,
                          values: Otp.join(""),
                          valuesAsArray: Otp.slice(),
                        }),
                    }
                  : {})}
                {...(onBlur
                  ? {
                      onBlur: (e) =>
                        onBlur({
                          index: i,
                          inputRefs,
                          reset,
                          values: Otp.join(""),
                          valuesAsArray: Otp.slice(),
                        }),
                    }
                  : {})}
              />
              <div className="separator_container">
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
