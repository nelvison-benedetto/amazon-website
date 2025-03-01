import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({children}){

    let test = 4;

    return(
        <GlobalContext.Provider
            value={{
                test,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
