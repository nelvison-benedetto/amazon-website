import { NavLink } from "react-router-dom";

export default function AppHeader(){

    return(
        <header className='debugwhite' style={{backgroundColor:'var(--blue1)', color:'white'}}>
            <div className="d-flex sticky-top justify-content-between p-2">
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
                <NavLink to='/signin' className='text-decoration-none text-white'><strong>Sign In</strong></NavLink>
            </div>
        </header>
    );
}