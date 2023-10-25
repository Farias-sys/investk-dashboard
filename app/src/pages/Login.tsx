import React from "react";

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

function Login(){

    const[email, setEmail] = React.useState("");
    const[password, setPassword] = React.useState("");

    return(
        <div className="main min-h-screen">
            <Header/>
            <div className="flex mt-24 justify-center">
                <Card className="w-96">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login no InvestK</CardTitle>
                        <CardDescription>Insira seu email e senha para entrar no sistema</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="m@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-500">Acessar</Button>
                        <h4 className="font-thin text-sm text-center">Não possuí uma conta? <a href="/register" className="text-blue-400">Crie uma conta!</a></h4>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;