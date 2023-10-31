export interface BanksProps{
    id:number|null
    name:string|null
}

export interface ProcessedBanksProps extends BanksProps{
    total_invested:number
    total_yield:number
    previsted_yield:number
}

export interface BanksContextProps{
    banks:BanksProps[]
    setProcessedBanks: React.Dispatch<React.SetStateAction<ProcessedBanksProps[]>>
    processed_banks:ProcessedBanksProps[]
    getBanksData: () => void
}