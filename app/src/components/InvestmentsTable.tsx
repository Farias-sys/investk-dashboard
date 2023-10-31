import React from "react"

import api from "@/services/api"
import { ProcessedInvestmentProps } from "@/types"
import { InvestmentsContext } from "@/context/InvestmentsContext"
import { InvestmentsContextProps } from "@/types/investments"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

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

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import CreateInvestmentForm from "./forms/CreateInvestmentForm"

export default function InvestmentsTable(){

    const {active_investments, getInvestmentsData} = React.useContext(InvestmentsContext) as InvestmentsContextProps
    
    // useStates for update forms

    const[label, setLabel] = React.useState<string|null>()
    const[description, setDescription] = React.useState<string|null>()
    const[investment_yield, setYield] = React.useState<any|null>()

    // Requests

    const deleteInvestment = async (investment_id : number) => {
        const response = await api.delete(`/investments/delete/${investment_id}`)
        await getInvestmentsData()
    }

    const updateInvestment = async (investment_id : number) => {
        const req_body = {
            "label":label,
            "description":description,
            "yield":investment_yield
        }
        const response = await api.post(`investments/update/${investment_id}`, req_body)
        
        await getInvestmentsData()
    }

    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-6 pl-4"><CreateInvestmentForm/></TableHead>
                    <TableHead className="text-center">Investimento</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-center">Rendimento</TableHead>
                    <TableHead className="text-center">Valor aplicado</TableHead>
                    <TableHead className="text-center">Valor ganho</TableHead>
                    <TableHead className="text-center">Data da criação</TableHead>
                    <TableHead className="text-center w-36">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {active_investments?.map((item : ProcessedInvestmentProps, index) => (
                    <TableRow key={index}>
                        <TableCell></TableCell>
                        <TableCell className="text-center">{item.label}</TableCell>
                        <TableCell className="text-center">{item.type.toUpperCase()}</TableCell>
                        <TableCell className="text-center">{item.yield}%</TableCell>
                        <TableCell className="text-center">R$ {item.initialValue.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2, maximumFractionDigits:2})}</TableCell>
                        <TableCell className="text-center">R$ {item.gains.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2, maximumFractionDigits:2})}</TableCell>
                        <TableCell className="text-center">{(new Date(item.dateCreated)).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center grid gap-2 grid-cols-2">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button size={"sm"} className="bg-red-500 hover:bg-red-400">Deletar</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-xl">Deletar investimento</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tem certeza que deseja deletar este investimento? Isso apagará todas as transações referentes a este investimento, bem como excluirá seu valor de todos os mapeamentos. <p className="underline font-bold">Esta ação é irreversível.</p>
                                        </AlertDialogDescription>
                                        <AlertDialogFooter className="pt-2">
                                            <AlertDialogCancel className="bg-white text-black hover:bg-zinc-200 hover:text-black">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-500 hover:bg-red-400" onClick={() => {deleteInvestment(item.id)}}>Deletar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button size={"sm"} className="bg-orange-500 hover:bg-orange-400">Editar</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader className="text-xl">Editar investimento</AlertDialogHeader>
                                    <AlertDialogDescription className="mt-[-0.7rem]">Mude dados triviais de seu investimento.</AlertDialogDescription>
                                    <form className="grid gap-4 border border-dashed rounded-md p-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="label">Identificador do investimento</Label>
                                            <Input id="label" type="text" placeholder={item.label} onChange={(e) => {setLabel(e.target.value)}}/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Descrição do investimento</Label>
                                            <Input id="description" type="text" placeholder={item.description} onChange={(e) => {setDescription(e.target.value)}}/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="yield">Rendimento do investimento</Label>
                                            <Input id="yield" type="number" placeholder={`${item.yield.toString()} %`} onChange={(e) => {setYield(e.target.value)}}/>
                                        </div>
                                    </form> 
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-white text-black hover:bg-zinc-200 hover:text-black">Cancelar</AlertDialogCancel>
                                        <AlertDialogAction className="bg-green-600 hover:bg-green-500" onClick={() => {updateInvestment(item.id)}}>Confirmar edição</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}