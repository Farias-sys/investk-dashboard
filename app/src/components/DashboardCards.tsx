import React from "react"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

interface DashboardCardsProps{
    icon: "montante_inicial" | "rendimentos" | "valor_total" | "rendimentos_previstos";
    title:string;
    value:number;
}

export default function DashboardCards(props : DashboardCardsProps){
    const icon = props.icon
    const title = props.title
    const value = props.value
    let tooltip_message : string = "";

    const iconSwitch = (icon : DashboardCardsProps['icon']) => {
        switch (icon) {
            case "montante_inicial":
                tooltip_message = "O valor inicial de seus investimentos"
                return(<LocalAtmIcon className="mt-2" style={{fontSize:'50px'}} color="warning"/>)
                break;
            case "rendimentos":
                tooltip_message = "O rendimento atual dos seus investimentos até a data de hoje (estimado)"
                return(<AssuredWorkloadIcon className="mt-2" style={{fontSize:'50px'}} color="success"/>)
                break;
            case "rendimentos_previstos":
                tooltip_message = "O rendimento bruto de seus investimentos se você não retirá-los antes do tempo (estimado)"
                return(<ShowChartIcon className="mt-2" style={{fontSize:'50px'}} color="secondary"/>)
                break;
            case "valor_total":
                tooltip_message = "O valor investido + o valor do seu rendimento atual"
                return(<RequestQuoteIcon className="mt-2" style={{fontSize:'50px'}} color="primary"/>)
                break;
            default:
                break;
        }
    }

    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Card className="bg-zinc-900">
                        <CardContent>
                            <div className="mt-5 flex">
                                <div className="pr-6 border-r-2 border-r-white">
                                    {iconSwitch(icon)}
                                </div>
                                <div className="ml-4 text-left">
                                    <h1 className="text-2xl font-light">{title}</h1>
                                <h2 className="text-3xl font-bold">R$ {value.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2, maximumFractionDigits:2})}</h2>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white text-sm font-light">{tooltip_message}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}