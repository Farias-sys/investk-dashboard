import { taxa_cdi } from "./InvestmentConsts";

export default function calcLCILCA(invested_value : number, yield_percent : number, years_invested : number){
    const total_yield = invested_value * (1 + yield_percent + taxa_cdi)^years_invested - invested_value;
    return total_yield
}