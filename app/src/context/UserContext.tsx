import React, { createContext } from "react";
import { useLocalStorage } from "@/hooks";

export interface UserProps{
    tenant: number
    email: string
    name: string 
    total_invested: number
    total_yield: number
}

export interface UserContextProps extends UserProps{
    setTenant: React.Dispatch<React.SetStateAction<number>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setTotalInvested: React.Dispatch<React.SetStateAction<number>>
    setTotalYield: React.Dispatch<React.SetStateAction<number>>
    logoff: () => void
}

export const UserContext = createContext<UserContextProps | null>(null);

function UserProvider({children} : any){
    const[tenant, setTenant] = useLocalStorage("tenant", 0)
    const[email, setEmail] = useLocalStorage("email", "")
    const[name, setName] = useLocalStorage("name", "")
    const[total_invested, setTotalInvested] = useLocalStorage("total_invested", 0)
    const[total_yield, setTotalYield] = useLocalStorage("total_yield", 0)

    const logoff = () => {
        localStorage.clear()
        window.location.assign('/login')
    }
    const userStore = {
        tenant, setTenant,
        email, setEmail,
        name, setName,
        total_invested, setTotalInvested,
        total_yield, setTotalYield,
        logoff
    }


    return(
        <UserContext.Provider value={userStore}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;