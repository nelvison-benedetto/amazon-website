import { NavLink } from "react-router-dom";
import StarParticles from "../components/StarParticles/StarParticles";

export default function NotFoundPage(){
    return (
        <>
            <div className=" d-flex flex-column align-items-center pt-4 gap-3 " style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
                <StarParticles />
                <h3 style={{fontSize:'6.4rem', color:'var(--yellow1)'}}>Sorry,</h3>
                <h3 style={{fontSize:'4.3rem', color:'var(--yellow1)'}}>we couldn't find that page.</h3>
                <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHF4bmxxcmIxM24yOWh4c2pnN2Ftbjg2MndpYTBnZGxpazl2cDVnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaBU6pgv0OsPHz2yxy/giphy.gif" alt="" style={{width:'22.2rem', borderRadius:'0.4rem'}}/>
                <NavLink to='/'>
                    <button className="btn-custom1">Return to Amazon's Home Page</button>
                </NavLink>
            </div>
        </>
    );
}