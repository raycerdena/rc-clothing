import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from './../form-input/form-input.component';
import "./sign-up-form.styles.css";
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return console.log("Password does not match.");
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return console.log("User already exist.");
      }

      console.error(error);
    }
  };

  return (
    <div className="sign-up-container">
    <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
      <FormInput label="Display Name"  
         inputOptions={{
          type:'text',
          required:true,
          onChange:handleChange,
          name:'displayName',
          value:displayName
         }} 
        />

       
        <FormInput label="Email"  
           inputOptions={{
          type:'email',
          required:true,
          onChange:handleChange,
          name:'email',
          value:email
         }} 
        />

        <FormInput label="Password"  
          inputOptions={{
          type:'password',
          required:true,
          onChange:handleChange,
          name:'password',
          value:password
         }} 
        />

        <FormInput label="Confirm Password"  
          inputOptions={{
          type:'password',
          required:true,
          onChange:handleChange,
          name:'confirmPassword',
          value:confirmPassword
         }} 
        />

       <Button type='submit'> Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
