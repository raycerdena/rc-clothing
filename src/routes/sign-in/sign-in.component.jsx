import { signInWithGooglePopUp, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
       const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };

    return (
        <div>
            <h1>SIGN IN</h1>
            <button onClick={loginGoogleUser}>Sign-in With Google</button>
            <SignUpForm/>
        </div>

    );
};

export default SignIn;