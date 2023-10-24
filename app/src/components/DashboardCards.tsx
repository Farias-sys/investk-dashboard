import React from "react"

import {
    Card,
    CardContent
  } from "@/components/ui/card"

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

interface IconTypes{
    icon: "montante_inicial" | "rendimentos" | "valor_total" | "impostos"
}

interface DashboardCardsProps{
    icon: IconTypes;
    title:string;
    value:number;
}

export function DashboardCards(props : DashboardCardsProps){
    const icon = props.icon
    const title = props.title
    const value = props.value

    const iconSwitch = (icon : IconTypes) => {
        switch (icon) {
            case "montante_inicial":
                return(<LocalAtmIcon className="mt-2" style={{fontSize:'50px'}} color="warning"/>)
                break;
            case "rendimentos":
                return(<ShowChartIcon className="mt-2" style={{fontSize:'50px'}} color="success"/>)
                break;
            case "impostos":
                return(<AssuredWorkloadIcon className="mt-2" style={{fontSize:'50px'}} color="error"/>)
                break;
            case "valor_total":
                return(<RequestQuoteIcon className="mt-2" style={{fontSize:'50px'}} color="primary"/>)
                break;
            default:
                break;
        }
    }

    return(
        <Card className="bg-zinc-900">
            <CardContent>
                <div className="mt-5 flex">
                    <div className="pr-6 border-r-2 border-r-white">
                        {iconSwitch(icon)}
                    </div>
                    <div className="ml-4">
                    <h1 className="text-2xl font-light">{title}</h1>
                    <h2 className="text-3xl font-bold">R$ {value.toLocaleString('pt-br', {style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits:2})}</h2>
                    </div>
                </div>
            </CardContent>
      </Card>
    )
}