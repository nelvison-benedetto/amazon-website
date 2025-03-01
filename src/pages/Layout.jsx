import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Outlet } from "react-router";

export default function Layout(){
    return(
        <>
            <AppHeader/>
            <main className='debug'>
                <Outlet/>
            </main>
            <AppFooter/>
        </>
    );
}