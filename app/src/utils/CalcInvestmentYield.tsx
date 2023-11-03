import { taxa_cdi } from "./InvestmentConsts";

export default function calcInvestmentYield(invested_value : number, yield_percent : number, years_invested : number, type : string){
    let gains : number
    
    switch (type) {
        case "cdb":
            // gains = calcCDB(item.initialValue, item.yield/100, )
            gains = invested_value * (1 + yield_percent + taxa_cdi)**years_invested - invested_value;
            break;
        case "lci/lca":
            gains = invested_value * (1 + yield_percent + taxa_cdi)^years_invested - invested_value;
            break;
        case "tesouro_prefixado":
            gains = invested_value * (1 + yield_percent)^years_invested - invested_value    
            break;
        default:
            gains = 0
            break;
    }

    return gains
}