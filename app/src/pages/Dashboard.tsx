import React from "react";

import { UserContext } from "@/context";
import { UserContextProps } from "@/context/UserContext";

import DashboardCards from "../components/DashboardCards";
import Header from "@/components/page/Header";
import InvestmentsTable from "@/components/InvestmentsTable";
import BanksTable from "@/components/BanksTable";
import YieldsChart from "@/components/YieldsChart";


function Dashboard() {

    const {total_invested, total_yield} = React.useContext(UserContext) as UserContextProps;
  
    return (
    <>
    <div className="main min-h-screen flex flex-col">
    
        <Header/>
        <main className="flex-1 p-6 flex-gap-6">
            <div className="cards grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCards title="Aporte Inicial: " value={total_invested} icon={"montante_inicial"}/>
                <DashboardCards title="Rendimentos: " value={total_yield} icon={"rendimentos"}/>
                <DashboardCards title="Impostos: " value={80.74} icon={"impostos"}/>
                <DashboardCards title="Valor total: " value={2120.1} icon={"valor_total"}/>
            </div>
            <div className="mt-4 w-4/4 h-64 rounded-md bg-zinc-900">
                <InvestmentsTable/>
            </div>
            <div className="grid gap-4 grid-cols-2">
                <div className="mt-4 w-4/4 h-[98%] pr-6 bg-zinc-900 rounded-md">
                    <h1 className="text-2xl ml-6 mt-4 mb-2 font-thin">Gráfico de rendimentos:</h1>
                    <YieldsChart/>
                </div>
                <div className="mt-4 w-4/4 h-[98%] rounded-md bg-zinc-900">
                    <h1 className="text-2xl ml-6 mt-4 font-thin">Bancos cadastrados:</h1>
                    <div className="w-[95%] items-center ml-4 mt-2">
                        <BanksTable/>
                    </div>
                </div>
            </div>
        </main>
    </div>
    </>
  )
}

export default Dashboard
