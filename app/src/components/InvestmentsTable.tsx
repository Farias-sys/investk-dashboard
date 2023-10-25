import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"

export default function InvestmentsTable(){
    return(
        <Table>
            <TableHeader>
                <TableRow>
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
                <TableRow>
                    <TableCell className="text-center">Investimento renda fixa XP</TableCell>
                    <TableCell className="text-center">CDB Pós fixado</TableCell>
                    <TableCell className="text-center">230%</TableCell>
                    <TableCell className="text-center">R$ 2.000,42</TableCell>
                    <TableCell className="text-center">R$ 200,42</TableCell>
                    <TableCell className="text-center">29/08/2023</TableCell>
                    <TableCell className="text-centerw w-36 grid gap-2 grid-cols-2">
                        <Button size={"sm"} className="bg-red-500 hover:bg-red-400">Deletar</Button>
                        <Button size={"sm"} className="bg-orange-500 hover:bg-orange-400">Editar</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}