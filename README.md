# react-otp

<p align="center">
  <a href="" >
    <img  src="https://res.cloudinary.com/mohii/image/upload/v1707755180/eq65pt2rvbmqmmeebqve.png" alt="@a7medhassan/react-otp">
  </a>
</p>

<h1 align="center">@a7medhassan/react-otp</h1>

`react-otp` is a React component library that provides an easy-to-use OTP (One-Time Password) input component with customizable features using typescript and react.
### it can also work with next js  without any problem
## Installation

You can install `react-otp` via npm or yarn:

```bash
npm install @a7medhassan/react-otp
```
```bash
yarn add @a7medhassan/react-otp
```
## Usage

To use react-otp in your React application, import the Otp component and customize it with props as needed:

```jsx
import React from 'react';
import Otp from '@a7medhassan/react-otp';

const MyOtpComponent = () => {
  const handleSubmit = () => {
    // Handle OTP submission
  };

  const handleReset = () => {
    // Handle OTP reset
  };

  return (
    <Otp
      onSubmit={handleSubmit}
      onReset={handleReset}
      numberOfInputs={6}
      isDisabled={false}
      shouldAutoFocus={true}
      // Add other props as needed
    />
  );
};

export default MyOtpComponent;
```


## Props

react-otp provides the following props for customization:
* `onSubmit`: Function called when the OTP is submitted.
 ```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 //* reset: function that handle reset of all inputs or one of theme
//ex 1 : reset() ==>> this will reset all inputs
//ex 2 : reset({index:1,value:""}) ==>> this will reset certain input with its index

const MyOtpComponent = () => {
   const btnRef = useRef<HTMLButtonElement>(null);
 return <>
  <Otp
  onSubmit={({values,valuesAsArray,reset,inputRefs}) => {}}
submitBtnRef={btnRef} // must be exist to be work

 />
 <button ref={resetRef}>reset</button>
 </>
}
 ```

* `onReset`: Function called when the OTP is reset.
```jsx
 //* reset: function that handle reset of all inputs or one of theme
//ex 1 : reset() ==>> this will reset all inputs
//ex 2 : reset({index:1,value:""}) ==>> this will reset certain input with its index
import React from 'react';
import Otp from 'react-otp';

const MyOtpComponent = () => {
  const resetRef = useRef<HTMLButtonElement>(null);
  const handleSubmit = () => {
    // Handle OTP submission
  };

  const handleReset = ({reset}) => {
    // Handle OTP reset
    reset()
  };

  return (
    <>
    <Otp
      onReset={handleReset}
      ResetBtnRef={resetRef} // must be exist to be work
      // Add other props as needed
    />
    <button ref={resetRef}>reset</button>
    <>
  );
};
export default MyOtpComponent;
 ```

* `numberOfInputs`: Number of input fields for the OTP (default: 1).
```jsx
 
 <Otp
  numberOfInputs={4} // number of inputs
 />
 ``` 

* `isDisabled`: Disables the OTP input fields (default: false).
* 
```jsx
 
 <Otp
  isDisabled={true} // to disable the  inputs
 />
 ``` 

* `shouldAutoFocus`: Automatically focuses on the first input field (default: true).
```jsx
 
 <Otp
  shouldAutoFocus={false} // by default when reload the page first input be focus automatic  if you want to disable this behavior
 />
 ```

* `renderSeparator`: Custom separator to render between input fields.
```jsx
 
 <Otp
  renderSeparator={<>*</>}
  </>
 ```

* `placeHolder`: Function to generate placeholders for input fields.

```jsx
 // placeHolder is a function that accept input number(index +1) and return string that display in placeholder input
 //ex: in input number one this function will look like this (1)=>"" you can return the number of input or any thing you want
 <Otp
  placeHolder={(inputNumber)=>""}
  </>
 ```

* `ContainerClassName`: CSS class name for the container element.
```jsx
 
 <Otp
  ContainerClassName="test"
   </>
 ```

* `inputClassName`: CSS class name for the input fields.

```jsx
 
 <Otp
  inputClassName="test"
   </>
 ```

* `onChange`: Function called when the OTP value changes.

 ```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 <Otp
  onChange={({values,valuesAsArray,inputRefs}) => {}}
 />
 ```


* `submitBtnRef`: Ref for the submit button.
* `ResetBtnRef`: Ref for the reset button.
* `submitAutomaticAfterInputsFilled`: Function to automatically submit OTP after all inputs are filled.
```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 //* reset: function that handle reset of all inputs or one of theme
//ex 1 : reset() ==>> this will reset all inputs
//ex 2 : reset({index:1,value:""}) ==>> this will reset certain input with its index
 <Otp
  submitAutomaticAfterInputsFilled={({values,valuesAsArray,reset,inputRefs}) => {}}
 />
 ```

* `onKeyDown`: Function called when a key is pressed in an input field.

```jsx
 // this function accept 1 argument as object 
 //* index:index of input ex:1
 //* key: value of input  ex:"5"
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 <Otp
  onKeyDown={({index,inputRefs,key}) => {}}
 />
 ```

* `onKeyUp`: Function called when a key is released in an input field.

```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* index:index of input ex:1
 //* key: value of input  ex:"5"
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 <Otp
  onKeyUp={({index,inputRefs,key,values,valuesAsArray})=>{ }}
 />
 ```

* `onFocus`: Function called when an input field gains focus.

```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* index:index of input ex:1
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 
 <Otp
    onFocus={({index,inputRefs,values,valuesAsArray})=>{
      }}
 />
 ```

* `onBlur`: Function called when an input field loses focus.

```jsx
 // this function accept 1 argument as object 
 //* values: values of inputs as string ex:"1233"
 //* valuesAsArray: values of inputs as array ex:["1","2","3","4"]
 //* index:index of input ex:1
 //* inputRefs: refs off all inputs  ex inputRefs.current=[ref,ref,ref,ref] 

 <Otp
   onBlur={({index,inputRefs,values,valuesAsArray})=>{}}
 />
 ```

 * `passwordType`: change the type of input to password (default=false).

 ```jsx
  <Otp
   passwordType={true}
 />
 ```



 <a href="https://www.buymeacoffee.com/a7medhassanmohi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=a7medhassanmohi&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" target="_blank" /></a>

License
This project is licensed under the MIT License.
