import React from "react";

import { InvestmentsContext } from "@/context/InvestmentsContext";
import { InvestmentsContextProps } from "@/types/investments";


import DashboardCards from "../components/DashboardCards";
import Header from "@/components/page/Header";
import InvestmentsTable from "@/components/InvestmentsTable";
import BanksTable from "@/components/BanksTable";
import YieldsChart from "@/components/YieldsChart";
import UserDropdown from "@/components/page/UserDropdown";


function Dashboard() {

    // const {total_invested, total_yield} = React.useContext(UserContext) as UserContextProps;
    const {total_invested, total_yield, previsted_yield} = React.useContext(InvestmentsContext) as InvestmentsContextProps;

    return (
    <>
    <div className="main min-h-screen">
        <UserDropdown/>
        <Header/>
        <main className="flex-1 p-6 flex-gap-6">
            <div className="cards grid gap-4 md:grid-cols-4">
                <DashboardCards title="Aporte Inicial: " value={total_invested} icon={"montante_inicial"}/>
                {/* <DashboardCards title="Impostos: " value={80.74} icon={"impostos"}/> */}
                <DashboardCards title="Rendimentos (atual):" value={total_yield} icon={"rendimentos"}/>
                <DashboardCards title="Rendimentos (prev): " value={previsted_yield} icon={"rendimentos_previstos"}/>
                <DashboardCards title="Valor total: " value={total_invested + total_yield} icon={"valor_total"}/>
            </div>
            <div className="mt-4 w-4/4 h-64 rounded-md bg-zinc-900 overflow-auto">
                <InvestmentsTable/>
            </div>
            <div className="grid gap-4 md:grid-cols-2 ">
                <div className="mt-4 w-4/4 h-[98%] pr-6 bg-zinc-900 rounded-md">
                    <h1 className="text-2xl ml-6 mt-4 mb-2 font-thin">Gráfico de rendimentos:</h1>
                    <YieldsChart/>
                </div>
                <div className="mt-4 w-4/4 h-[98%] rounded-md bg-zinc-900">
                    <h1 className="text-2xl ml-6 mt-4 font-thin">Bancos cadastrados:</h1>
                    <div className="w-[95%]items-center ml-4 mt-2">
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
