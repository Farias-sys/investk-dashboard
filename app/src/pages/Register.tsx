import React from "react";

import { useNavigate } from "react-router-dom";
import api from "@/services/api";

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

function Register(){

    const navigate = useNavigate();

    const[username, setUsername] = React.useState(""); 
    const[email, setEmail] = React.useState("");
    const[password, setPassword] = React.useState("");

    const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const request = await api.post("/users/create", {"name":username, "email":email, "password":password})
            if(request.status == 200){
                navigate("/login");
            }
        } catch (error) {
            
        }
    }

    return(
        <div className="min-h-screen">
            <Header/>
            <div className="flex mt-24 justify-center">
                <Card className="w-96">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Criar conta no InvestK</CardTitle>
                        <CardDescription>Insira os dados abaixo para criar uma nova conta :D</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form onSubmit={onSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Nome</Label>
                                <Input id="email" type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Como devemos te chamar?" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="m@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" onChange={(e) => {setPassword(e.target.value)}} />
                            </div>
                
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-500">Criar conta</Button>
                            <Link to={"/"}>
                                <Button className="w-full hover:bg-slate-200">
                                    Voltar para área de login
                                </Button>
                            </Link>
                            <h4 className="font-thin text-sm text-center">Ao criar uma conta você concorda com nossos <a href="https://www.linkedin.com/in/cafsjr/" className="text-blue-400">Termos e Condições</a></h4>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Register;