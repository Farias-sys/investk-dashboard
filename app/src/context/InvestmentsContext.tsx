import React, {createContext} from "react";

import { UserContext } from "@/context";
import { UserContextProps } from "@/context/UserContext";

import { ProcessedInvestmentProps } from "@/types";
import {InvestmentProps} from "@/types";
import api from "@/services/api";


import { calcCDB, calcDate } from "@/utils";
import { InvestmentsContextProps } from "@/types/investments";

export const InvestmentsContext = createContext<InvestmentsContextProps|null>(null)

function InvestmentsProvider({children} : any){
    const {tenant} = React.useContext(UserContext) as UserContextProps;

    const[investments, setInvestments] = React.useState<InvestmentProps[]|null>([])
    const[active_investments, setActiveInvestments] = React.useState<ProcessedInvestmentProps[]|null>([])

    const[total_invested, setTotalInvested] = React.useState<InvestmentsContextProps['total_invested']|0>(0)
    const[total_taxes, setTotalTaxes] = React.useState<InvestmentsContextProps['total_taxes']|0>(0)
    const[total_yield, setTotalYield] = React.useState<InvestmentsContextProps['total_yield']>(0)
    const[previsted_yield, setPrevistedYield] = React.useState<InvestmentsContextProps['previsted_yield']>(0)

    // Load data

    React.useEffect(() => {
        getInvestmentsData()
    }, [])

    React.useEffect(() => {
        proccessInvestmentsData();
    }, [investments])

    // Request data

    const resetTempData = () => {
        setActiveInvestments([])
        setTotalInvested(0)
        setTotalTaxes(0)
        setTotalYield(0)
        setPrevistedYield(0)
    }

    const getInvestmentsData = async () => {    
        resetTempData()
        const response = await api.get(`/investments/get/${tenant}`)
        setInvestments(response.data);
    }

    // Proccess investment data

    const proccessInvestmentsData = () => {
        if(investments){
            let total_invested : number = 0;
            let total_yield : number = 0;
            let previsted_yield : number = 0;
            for (let index = 0; index < investments.length; index++) {
                const item = investments[index];
                let gains : number;
                let previsted_gains : number;
                const investment_created_date : Date = new Date(item.dateCreated)
                const date_now : Date = new Date()
                switch (item.type) {
                    case "cdb":
                        gains = calcCDB(item.initialValue, item.yield/100, calcDate(date_now, investment_created_date))
                        previsted_gains = calcCDB(item.initialValue,item.yield/100,item.planedInterval)
                        break;
                    case "lci/lca":
                        gains = calcCDB(item.initialValue, item.yield/100, calcDate(date_now, investment_created_date))
                        previsted_gains = calcCDB(item.initialValue,item.yield/100,item.planedInterval)
                        break;
                    case "tesouro_prefixado":
                        gains = calcCDB(item.initialValue, item.yield/100, calcDate(date_now, investment_created_date))
                        previsted_gains = calcCDB(item.initialValue,item.yield/100,item.planedInterval)
                        break;
                    default:
                        gains = 0
                        previsted_gains = 0
                        break;
                }
                total_invested += item.initialValue
                total_yield += gains
                previsted_yield += previsted_gains

                const processed_investment : ProcessedInvestmentProps = {
                    "id":item.id,
                    "label":item.label,
                    "description":item.description,
                    "bankId":item.bankId,
                    "type":item.type,
                    "initialValue":item.initialValue,
                    "yield":item.yield,
                    "gains":gains,
                    "previsted_gains":previsted_gains,
                    "taxes":0,
                    "dateCreated":item.dateCreated,
                    "planedInterval":item.planedInterval

                }
                active_investments?.push(processed_investment)
            }
            setTotalInvested(total_invested)
            setTotalYield(total_yield)
            setPrevistedYield(previsted_yield)
        }
    }

    const investmentsStore = {
        investments,
        active_investments, 
        total_invested,
        total_taxes,
        total_yield,
        previsted_yield,
        getInvestmentsData
    }

    return(
        <InvestmentsContext.Provider value={investmentsStore}>
            {children}
        </InvestmentsContext.Provider>
    )
}

export default InvestmentsProvider;