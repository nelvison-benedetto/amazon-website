import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader"
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