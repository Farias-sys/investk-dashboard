import React, { createContext } from "react";

export interface UserContextProps{
    tenant: number
    setTenant: React.Dispatch<React.SetStateAction<number>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    name: string 
    setName: React.Dispatch<React.SetStateAction<string>>
    total_invested: number
    setTotalInvested: React.Dispatch<React.SetStateAction<number>>
    total_yield: number
    setTotalYield: React.Dispatch<React.SetStateAction<number>>
}

export const UserContext = createContext<UserContextProps | null>(null);

function UserProvider({children} : any){
    const[tenant, setTenant] = React.useState(0)
    const[email, setEmail] = React.useState("")
    const[name, setName] = React.useState("")
    const[total_invested, setTotalInvested] = React.useState(0)
    const[total_yield, setTotalYield] = React.useState(0)

    const userStore = {
        tenant, setTenant,
        email, setEmail,
        name, setName,
        total_invested, setTotalInvested,
        total_yield, setTotalYield
    }

    return(
        <UserContext.Provider value={userStore}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;