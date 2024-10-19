import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let DataContext = createContext();

export default function DataContextFunction({ children }) {



    // Fetch transactions and incoming transfers when the component loads
    useEffect(() => {
       
    }, []);

    return (
        <DataContext.Provider
            value={{
               
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
