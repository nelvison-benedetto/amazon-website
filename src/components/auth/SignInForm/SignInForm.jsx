
import InputForm from "../../InputForm/InputForm";
import { useState } from "react";
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
 } from "../../../utils/firebase/firebase";
import ButtonAmazon from "../../buttons/ButtonAmazon";


export default function SignInForm(){

    const initialFormFields={
            email: '',
            password: '',
        };
    const [formFields,setFormFields] = useState(initialFormFields);
    const {email, password} = formFields;  //is recalculed each time the state of formFields changes
    const resetFormFields = () => setFormFields(initialFormFields);

    const signInWithGoogle = async() =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    alert('Invalid username/password');
                    break;
                case 'auth/email-already-in-use':
                    alert('Cannot create user, email already in use');
                    break;
                case 'auth/weak-password':
                    alert('Password too weak! It must be at least 6 characters.');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email format. Please enter a valid email.');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password. Please try again.');
                    break;
                case 'auth/user-not-found':
                    alert('No account found with this email.');
                    break;
                default:
                    console.log('User creation encountered an error:', error);
            }
        }
    }

    const handleFormFields= (e) =>{  
        const{ name, type, value, checked, files } = e.target;  //extract top properties from the input!
        setFormFields(prev=>({
            ...prev,
            [name]: value,
        }))
    }
    const testfields = ()=>{console.log(formFields);}


    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputForm
                    label='Email'
                    placeholder='Enter the email'
                    type='email'
                    required
                    onChange={handleFormFields}
                    id='signInEmail'
                    name='email'
                    value={email}
                />
                <InputForm
                    label='Password'
                    placeholder='Enter the password'
                    type='password'
                    required
                    onChange={handleFormFields}
                    id='signInPassword'
                    name='password'
                    value={password}
                />
                {/* <button type="submit" className="btn btn-primary">Sign In</button>
                <button type="button" className="btn btn-secondary" onClick={testfields}>test fields</button> */}
                <ButtonAmazon type='submit'>Sign In</ButtonAmazon>
            </form>
        </>
    );
}