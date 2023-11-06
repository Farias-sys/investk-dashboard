import React from "react";

import { UserContext } from "@/context";
import { UserContextProps } from "@/context/UserContext";
import api from "@/services/api";
import axios, { AxiosError } from "axios";

import Header from "@/components/page/Header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
}from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

function Login(){

    const {
        setTenant,
        setEmail,
        setName,
        setTotalInvested,
        setTotalYield
    } = React.useContext(UserContext) as UserContextProps;

    const[user_email, setUserEmail] = React.useState("");
    const[password, setPassword] = React.useState("");

    // Show states
    const[showWrongPasswordAlert, setShowWrongPasswordAlert] = React.useState(false);
    const[showNotFoundUserAlert, setShowNotFoundUserAlert] = React.useState(false);

    const closeAllAlerts = () => {
        setShowWrongPasswordAlert(false)
        setShowNotFoundUserAlert(false)
    }

    const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        closeAllAlerts()
        try {
            const request = await api.post("/users/login", {"email":user_email, "password":password})
            if(request.status == 200){
                const res = request.data
                setTenant(res.id)
                setEmail(res.email)
                setName(res.name)
                setTotalInvested(res.totalInvested)
                setTotalYield(res.totalYield)
                window.location.assign('/dashboard')
            }
        } catch (err) {
            if(axios.isAxiosError(err)){
                const axiosError = err as AxiosError;
                
                if (axiosError.response?.status === 401) {
                    setShowWrongPasswordAlert(true)
                } else if(axiosError.response?.status === 404){
                    setShowNotFoundUserAlert(true)
                }
            }
        } 
    }

    return(
        <div className="main min-h-screen">
            <Header/>
            <div className="flex mt-24 justify-center">
                <Card className="w-96">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login no InvestK</CardTitle>
                        <CardDescription>Insira seu email e senha para entrar no sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" onChange={(e) => {setUserEmail(e.target.value)}} placeholder="m@example.com" required/>
                                {(showNotFoundUserAlert) && ((<h4 className="font-extralight text-xs text-yellow-600">Usuário não encontrado!</h4>))}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password" onChange={(e) => {setPassword(e.target.value)}} required/>
                                {(showWrongPasswordAlert) && (<h4 className="font-extralight text-xs text-yellow-600">Senha incorreta!</h4>)}
                            </div>
                            <Button className="w-full bg-green-600 hover:bg-green-500">Acessar</Button>
                            <h4 className="font-thin text-sm text-center">Não possuí uma conta? <Link to={"/register"} className="text-blue-400 hover:text-lg">Crie uma conta!</Link></h4>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;