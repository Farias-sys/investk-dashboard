import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { BanksContext } from "@/context/BanksContext"
import { BanksContextProps, ProcessedBanksProps } from "@/types/banks"
import React from "react"

export default function BanksTable(){
    const {processed_banks} = React.useContext(BanksContext) as BanksContextProps
    
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Nome do banco</TableHead>
                    <TableHead className="text-center">Valor aplicado</TableHead>
                    <TableHead className="text-center">Valor de rendimentos (atual)</TableHead>
                    <TableHead className="text-center">Valor de rendimentos (prev)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    processed_banks?.map((item : ProcessedBanksProps, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">{item.name}</TableCell>
                        <TableCell className="text-center">R${item.total_invested.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2})}</TableCell>
                        <TableCell className="text-center">R${item.total_yield.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2})}</TableCell>
                        <TableCell className="text-center">R${item.previsted_yield.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2})}</TableCell>
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}