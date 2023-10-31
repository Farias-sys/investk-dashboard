import { BanksContextProps, BanksProps, ProcessedBanksProps } from "@/types/banks";
import React from "react";
import { UserContext } from ".";
import { UserContextProps } from "./UserContext";
import api from "@/services/api";
import { InvestmentsContext } from "./InvestmentsContext";
import { InvestmentsContextProps, ProcessedInvestmentProps } from "@/types/investments";

export const BanksContext = React.createContext<BanksContextProps|null>(null)


function BanksProvider({children} : any){
    const {tenant} = React.useContext(UserContext) as UserContextProps
    const {active_investments} = React.useContext(InvestmentsContext) as InvestmentsContextProps

    const[banks, setBanks] = React.useState<BanksContextProps['banks']>([])
    const[processed_banks, setProcessedBanks] = React.useState<BanksContextProps['processed_banks']>([])
    
    React.useEffect(()=>{
        getBanksData()
    },[])
    
    React.useEffect(() => {
        createProcessedBanksData()
    }, [banks])
    
    // React.useEffect(() => {
    //     processBanksData()
    // }, [active_investments])


    const getBanksData = async () => {
        const response = await api.get(`/banks/get/${tenant}`)
        setBanks(response.data)
    }

    const createProcessedBanksData = () => {
        if(banks){
            const newBanksArray : ProcessedBanksProps[] = banks.map((item : BanksProps) => {
                const bank_id : ProcessedBanksProps['id'] = item.id
                const bank_name : ProcessedBanksProps['name'] = item.name

                return {
                    "id":bank_id,
                    "name":bank_name,
                    "total_invested":0,
                    "total_yield":0,
                    "previsted_yield":0
                }
            })
            setProcessedBanks(newBanksArray)    
        }
    }

    const mapBanksByInvestment = (bank_id : ProcessedBanksProps['id'], total_invested : ProcessedBanksProps['total_invested'], total_yield : ProcessedBanksProps['total_yield'], previsted_yield : ProcessedBanksProps['previsted_yield']) => {
        const newBanksArray : ProcessedBanksProps[] = processed_banks.map((item: ProcessedBanksProps) => {
            console.log(bank_id)
            if(bank_id==item.id){
                item.total_invested+=total_invested
                item.total_yield+=total_yield
                item.previsted_yield+=previsted_yield
                return {
                    "id":item.id,
                    "name":item.name,
                    "total_invested":item.total_invested,
                    "total_yield":item.total_yield,
                    "previsted_yield":item.previsted_yield
                }
            } else {
                return item
            }
        })
        setProcessedBanks(newBanksArray)
    }

    const processBanksData = () => {
        if(active_investments){
            console.log(active_investments)
            active_investments.map((item : ProcessedInvestmentProps) => {
                const investment_bank : ProcessedInvestmentProps['bankId'] = item.bankId
                console.log(investment_bank)
                const total_invested : ProcessedInvestmentProps['initialValue'] = item.initialValue
                const total_yield : ProcessedInvestmentProps['gains'] = item.gains
                const previsted_yield : ProcessedInvestmentProps['previsted_gains'] = item.previsted_gains
                mapBanksByInvestment(investment_bank, total_invested, total_yield, previsted_yield)
            })
        }
    }

    const store = {
        banks,
        processed_banks,
        setProcessedBanks,
        getBanksData
    }

    return(
        <BanksContext.Provider value={store}>
            {children}
        </BanksContext.Provider>
    )

}

export default BanksProvider;
