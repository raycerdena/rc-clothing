import {signInWithFacebookPopUp, signInWithGooglePopUp,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
const SignIn = () =>{

    const loginGoogleUser = async ()=>{
        const response = await signInWithGooglePopUp();
        createUserDocumentFromAuth(response.user);
    };
    const loginFacebookUser = async ()=>{
        const {user} = await signInWithFacebookPopUp();
        const userDocRef =await createUserDocumentFromAuth(user);
    };

return(
    <div>
        <h1>SIGN IN</h1>
        <button onClick={loginGoogleUser}>Sign-in With Google</button>
        {/* <button onClick={loginFacebookUser}>Sign-in With Facebook</button> */}
    </div>
);
};
export default SignIn;