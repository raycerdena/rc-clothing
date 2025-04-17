import { useState } from "react";
import {
  signInUserWithEmailandPassword,
  signInWithGooglePopUp
} from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import "./sign-in-form.styles.css";
import Button from "../button/button.component";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();


  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      return console.log("Please input your password");
    }
    if (!email) {
      return console.log("Please input your email");
    }
    try {
      await signInUserWithEmailandPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      console.log(error);
      switch (error.code) {

        case "auth/wrong-password":
          console.log("Login failed, incorrect password.");
          break;
        case "auth/user-not-found":
          console.log("Login failed,User does not exist.");
          break;

        default:
          console.log(error);
          break;
      }
      return;

    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In Page</h2>
      <span>Login to your account</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email"
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email
          }}
        />


        <FormInput label="Password"
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password
          }}
        />
        <div className="buttons-container">
          <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google Sign-In</Button>
          <Button type='submit'>Sign In</Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
