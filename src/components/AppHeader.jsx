import { Link, NavLink } from "react-router-dom";
import {signOutUser} from '../utils/firebase/firebase';
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalProvider";
import NavBar from "./NavBar/NavBar";

export default function AppHeader(){

    const { authState } = useContext(GlobalContext); 
    const { currentUser, setCurrentUser } = authState;

    // const signOutHandler = async() =>{  //used before using onAuthStateChanged of firebase 
    //     await signOutUser();
    //     setCurrentUser(null);
    // };

    return(
        <header className='' style={{backgroundColor:'var(--blue1)', color:'white'}}>

            <NavBar/>
            {/* <div className="d-flex sticky-top justify-content-between p-2">
                <NavLink to='/'>
                    <img src='/amznlogo.svg' className='p-2' alt="" style={{width:'8rem'}}/>
                </NavLink>
                <span className="d-flex">
                    <i className="fa-solid fa-location-dot align-self-end" style={{color:'white', fontSize:'1.7rem', paddingRight:'0.4rem' }}></i>
                    <span className="d-flex flex-column">Deliver to X<strong>Location</strong></span>
                </span>
                <span>SEARCH BAR</span>

                <span>Flag</span>
                <NavLink to='/contact' className='text-decoration-none text-white d-flex flex-column'>Hello, X<strong>Account & Lists</strong></NavLink>
                <NavLink to='/contact' className='text-decoration-none text-white d-flex flex-column'>Returns <strong>& Orders</strong></NavLink>
                {/* <NavLink to='/auth' className='text-decoration-none text-white'><strong>Sign In</strong></NavLink> */}
                {/* 
                {currentUser? (
                    <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                ) : (
                    <Link className="nav-link" to='/auth'>SIGN IN</Link>
                )}
            </div>  */} 

        </header>
    );
}