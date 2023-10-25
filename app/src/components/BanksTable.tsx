import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function BanksTable(){
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Nome do banco</TableHead>
                    <TableHead className="text-center">Valor aplicado</TableHead>
                    <TableHead className="text-center">Valor de rendimentos</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="text-center">XP Inc.</TableCell>
                    <TableCell className="text-center">R$ 2.000,00</TableCell>
                    <TableCell className="text-center">R$ 200,00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center">C6 Bank</TableCell>
                    <TableCell className="text-center">R$ 00,00</TableCell>
                    <TableCell className="text-center">R$ 00,00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}