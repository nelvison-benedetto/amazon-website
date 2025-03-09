import { useState,useContext } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase";
import InputForm from "../../InputForm/InputForm";
import ButtonAmazon from "../../Buttons/ButtonAmazon";
import { GlobalContext } from "../../../contexts/GlobalProvider";

export default function SignUpForm(){

    const {authState} = useContext(GlobalContext);
    const {currentUser, setCurrentUser} = authState;

    const initialFormFields={
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [formFields,setFormFields] = useState(initialFormFields);
    const {displayName, email, password, confirmPassword} = formFields;  //is recalculed each time the state of formFields changes
    const resetFormFields = () => setFormFields(initialFormFields);
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert('passwords do not match');
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            //setCurrentUser(user);  used before using onAuthStateChanged of firebase 
            await createUserDocumentFromAuth(user, {displayName});
            //const response = await signInAuthUserWithEmailAndPassword(email,password);
            //console.log(response);
            resetFormFields();

        }catch(error){ 
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{console.log('user creation encountered an error', error);}
            
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

    return(
        <>
            <h3>Sign up with your email and password</h3>
            <form onSubmit={handleSubmit}>

                <InputForm
                    label='Display Name'
                    placeholder='Enter the display name'
                    type='text'
                    required
                    onChange={handleFormFields}
                    id='signUpDisplayName'
                    name='displayName'
                    value={displayName}
                />
                <InputForm
                    label='Email'
                    placeholder='Enter the email'
                    type='email'
                    required
                    onChange={handleFormFields}
                    id='signUpEmail'
                    name='email'
                    value={email}
                />
                <InputForm
                    label='Password'
                    placeholder='Enter the password'
                    type='password'
                    required
                    onChange={handleFormFields}
                    id='signUpPassword'
                    name='password'
                    value={password}
                />
                <InputForm
                    label='Confirm Password'
                    placeholder='Enter the confirm password'
                    type='password'
                    required
                    onChange={handleFormFields}
                    id='signUpConfirmPassword'
                    name='confirmPassword'
                    value={confirmPassword}
                />
{/* 
                <label htmlFor="displayName" className="form-label">Display Name</label>
                <input type="text" id="displayName" name="displayName" className="form-control" placeholder="Enter your name" onChange={handleFormFields} value={formFields.displayName} required/>

                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" onChange={handleFormFields} value={formFields.email} required/>

                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" onChange={handleFormFields} value={formFields.password} required/>
                
                <label htmlFor="confirmPassword" className="form-label">Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm your password" onChange={handleFormFields} value={formFields.confirmPassword} required/>
   */}
                
                {/* <button type="submit" className="btn btn-primary">Sign Up</button>
                <button type="button" className="btn btn-secondary" onClick={testfields}>test fields</button> */}
                <ButtonAmazon type='submit'>Sign Up</ButtonAmazon>
            </form>
        </>
    );
}