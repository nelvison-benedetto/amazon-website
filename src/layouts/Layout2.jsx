import AppHeader from "../components/AppHeader";
import { Outlet } from "react-router";

export default function Layout2(){
    return(
        <>
            <AppHeader />
            <main className='debug'>
                <Outlet />
            </main>
        </>
    );
}