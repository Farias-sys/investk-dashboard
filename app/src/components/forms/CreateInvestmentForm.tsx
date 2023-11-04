import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
      
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from "@/components/ui/textarea"
import { InvestmentProps } from '@/types';
import React from 'react';
import { calcSumDateWDays } from '@/utils';
import api from '@/services/api';
import { UserContext } from '@/context';
import { UserContextProps } from '@/context/UserContext';
import { InvestmentsContext } from '@/context/InvestmentsContext';
import { InvestmentsContextProps } from '@/types/investments';
import CreateBankForm from './CreateBankForm';
import { BanksContext } from '@/context/BanksContext';
import { BanksContextProps } from '@/types/banks';
import { message } from 'antd';


export default function CreateInvestmentForm(){
    
    // Tenant context

    const {tenant} = React.useContext(UserContext) as UserContextProps
    const{getInvestmentsData} = React.useContext(InvestmentsContext) as InvestmentsContextProps
    const{processed_banks} = React.useContext(BanksContext) as BanksContextProps

    // Values of forms to create investment

    const[label, setLabel] = React.useState<InvestmentProps['label']|null>(null)
    const[bank, setBank] = React.useState<InvestmentProps['bankId']|null>(null)
    const[type, setType] = React.useState<InvestmentProps['type']|null>(null)
    const[description, setDescription] = React.useState<InvestmentProps['description']|null>(null)
    const[initialValue, setInitialValue] = React.useState<InvestmentProps['initialValue']|null>(null)
    const[investment_yield, setYield] = React.useState<InvestmentProps['yield']|null>(null)
    const[date_created, setDateCreated] = React.useState<InvestmentProps['dateCreated']>(new Date())
    const[date_expire, setDateExpire] = React.useState<Date>(new Date())

    const onSubmit = async () => {
        const investmentObject = {
            "label":label,
            "type":type,
            "description":description,
            "yield":investment_yield,
            "initialValue":initialValue,
            "dateCreated":calcSumDateWDays(date_created, 1),
            "dateDeadline":calcSumDateWDays(date_expire, 1)

        }
        const response = await api.post(`investments/create/${tenant}/${bank}`, investmentObject)

        if(response.status==200){
            message.success({
                "content":"Investimento cadastrado com sucesso!",
                "style":{marginTop:'5rem'}
            })
        }

        getInvestmentsData()
    }
    
    return(
        <AlertDialog>
            <AlertDialogTrigger><AddCircleIcon color={"success"} className='hover:text-green-600'/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl'>Adicionar investimento</AlertDialogTitle>
                    <AlertDialogDescription className="mt-[-0.7rem]">Simule um investimento em renda fixa e acompanhe como seu dinheiro irá render!</AlertDialogDescription>
                    <form className="grid gap-4 border border-dashed rounded-md p-4 h-96 overflow-auto">
                        <div className="grid gap-2">
                            <Label htmlFor="label">Identificador do investimento</Label>
                            <Input id="label" type="text" placeholder="Ex: Caixinha do PicPay" onChange={(e) => {setLabel(e.target.value)}} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label className='flex'>
                                Banco
                                <CreateBankForm/>
                            </Label>
                            <Select onValueChange={(value) => {setBank(Number(value))}} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Banco em que seu investimento está alocado"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        processed_banks.map((item, index) => (
                                            <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Tipo</Label>
                            <Select required onValueChange={(value) => {setType(value)}}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo do seu investimento (Ex: Tesouro Direto Pré-fixado)"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key='cdb' value='cdb'>CDB Pré-fixado</SelectItem>
                                    <SelectItem key='lci/lca' value='lci/lca'>LCI / LCA</SelectItem>
                                    <SelectItem key='tesouro_prefixado' value='tesouro_prefixado'>Tesouro Direto Pré-Fixado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor='description'>Descrição do seu investimento</Label>
                            <Textarea id='description' className='resize-none' placeholder='Ex: Investimento realizado para compra de uma bike...' onChange={(e) => {setDescription(e.target.value)}} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor='initial_value'>Aporte inicial</Label>
                            <Input type={"number"} id='initial_value' placeholder='R$ 2.000,00' onChange={(e) => {setInitialValue(Number(e.target.value))}} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor='yield'>Taxa fixa do fundo (ao ano)</Label>
                            <Input type={"number"} id="yield" placeholder='10%' onChange={(e) => {setYield(Number(e.target.value))}} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor='date_created'>Data do investimento</Label>
                            <Input type={"date"} id="date_created" onChange={(e) => {setDateCreated(new Date(e.target.value))}} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor='date_expire'>Data de vencimento do investimento</Label>
                            <Input type={"date"} id='date_expire' onChange={(e) => {setDateExpire(new Date(e.target.value))}} required/>
                        </div>
                    </form>
                    <AlertDialogFooter className='pt-2'>
                        <AlertDialogCancel className="bg-white text-black hover:bg-zinc-200 hover:text-black">Cancelar</AlertDialogCancel>
                        <AlertDialogAction type={"submit"} className="bg-green-600 hover:bg-green-500" onClick={onSubmit}>Adicionar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}