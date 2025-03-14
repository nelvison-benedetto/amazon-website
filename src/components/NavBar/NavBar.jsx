import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalProvider";
import { signOutUser } from "../../utils/firebase/firebase";

export default function NavBar(){

    const { authState } = useContext(GlobalContext); 
    const { currentUser, setCurrentUser } = authState;
    console.log(currentUser);
    return(
        <>
            <div className="d-flex sticky-top justify-content-between p-2">
                <NavLink to='/'>
                    <img src='/amznlogo.svg' className='p-2' alt="" style={{width:'8rem'}}/>
                </NavLink>
                <span className="d-flex">
                    <i className="fa-solid fa-location-dot align-self-end" style={{color:'white', fontSize:'1.7rem', paddingRight:'0.4rem' }}></i>
                    <span className="d-flex flex-column">Deliver to {}<strong>Location</strong></span>
                </span>
                <span>SEARCH BAR</span>

                <span>Flag</span>
                <NavLink to='/contact' className='text-decoration-none text-white d-flex flex-column'>Hello, {}<strong>Account & Lists</strong></NavLink>
                <NavLink to='/contact' className='text-decoration-none text-white d-flex flex-column'>Returns <strong>& Orders</strong></NavLink>
                {/* <NavLink to='/auth' className='text-decoration-none text-white'><strong>Sign In</strong></NavLink> */}

                {currentUser? (
                    <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                ) : (
                    <Link className="nav-link" to='/auth'>SIGN IN</Link>
                )}
            </div>
        </>
    );
}