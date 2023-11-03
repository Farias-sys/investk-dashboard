export default interface InvestmentProps{
    id:number
    label:string
    description:string
    type:string
    yield:number
    initialValue:number
    dateCreated:Date
    dateDeadline:Date
    bankId:number
}

export interface ProcessedInvestmentProps extends InvestmentProps{
    gains:number
    previsted_gains:number
    taxes:number
}

export interface InvestmentsContextProps{
    investments:InvestmentProps[]|null
    active_investments: ProcessedInvestmentProps[]|null
    total_invested:number | 0
    total_taxes:number | 0
    total_yield:number | 0
    previsted_yield: number | 0
    getInvestmentsData: () => void
}