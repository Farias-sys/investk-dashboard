export default function calcTesouroPrefixado(invested_value : number, yield_percent : number, years_invested : number){
    const total_yield = invested_value * (1 + yield_percent)^years_invested - invested_value    
    return total_yield;
}