import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    } from "@/components/ui/alert-dialog" 
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import React from "react"
import api from "@/services/api"
import { UserContext } from "@/context"
import { UserContextProps } from "@/context/UserContext"
import { BanksContext } from "@/context/BanksContext"
import { BanksContextProps } from "@/types/banks"

export default function CreateBankForm(){
    const {tenant} = React.useContext(UserContext) as UserContextProps
    const{getBanksData} = React.useContext(BanksContext) as BanksContextProps


    const[name, setName] = React.useState<string|null>()

    const onSubmit = async () => {
        const response = await api.post(`/banks/create/${tenant}`, {"name":name})
        getBanksData()
    }

    return(
        <AlertDialog>
        <AlertDialogTrigger><p className="text-xs ml-2 text-blue-600 hover:text-blue-700">(Criar novo)</p></AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Adicionar novo banco</AlertDialogTitle>
                <AlertDialogDescription>Adicione um novo banco para reunir seus investimentos</AlertDialogDescription>
            </AlertDialogHeader>
            <form className="grid gap-4 border border-dashed rounded-md p-4" >
                <div className="grid gap-2">
                    <Label htmlFor="name">Nome do banco</Label>
                    <Input id="name" type="text" placeholder="Ex: Bradesco" onChange={(e) => {setName(e.target.value)}} required/>
                </div>
            </form>
            <AlertDialogFooter>
                <AlertDialogCancel className="bg-white text-black hover:bg-zinc-200 hover:text-black">Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-green-600 hover:bg-green-500" onClick={onSubmit}>Adicionar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}