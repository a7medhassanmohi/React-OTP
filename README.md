# react-otp

`react-otp` is a React component library that provides an easy-to-use OTP (One-Time Password) input component with customizable features.

## Installation

You can install `react-otp` via npm or yarn:

```bash
npm install react-otp
```
```bash
# or
yarn add react-otp
```
## Usage

To use react-otp in your React application, import the Otp component and customize it with props as needed:

```jsx
import React from 'react';
import Otp from 'react-otp';

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
onSubmit: Function called when the OTP is submitted.
onReset: Function called when the OTP is reset.
numberOfInputs: Number of input fields for the OTP (default: 1).
isDisabled: Disables the OTP input fields (default: false).
shouldAutoFocus: Automatically focuses on the first input field (default: true).
renderSeparator: Custom separator to render between input fields.
placeHolder: Function to generate placeholders for input fields.
ContainerClassName: CSS class name for the container element.
inputClassName: CSS class name for the input fields.
onChange: Function called when the OTP value changes.
submitBtnRef: Ref for the submit button.
ResetBtnRef: Ref for the reset button.
submitAutomaticAfterInputsFilled: Function to automatically submit OTP after all inputs are filled.
onKeyDown: Function called when a key is pressed in an input field.
onKeyUp: Function called when a key is released in an input field.
onFocus: Function called when an input field gains focus.
onBlur: Function called when an input field loses focus.
For more detailed usage and customization options, please refer to the documentation or source code.

License
This project is licensed under the MIT License.