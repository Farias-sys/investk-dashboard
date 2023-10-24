import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { DashboardCards } from "./components/DashboardCards";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

function App() {
  return (
    <>
    <div className="main min-h-screen flex flex-col">
      <div className="header px-6 py-2 items-center text-center border-b">
        <h1 className="text-4xl font-bold"><AccountBalanceWalletIcon fontSize={"large"}/> InvestK</h1>
      </div>
      <main className="flex-1 p-6 flex-gap-6">
        <div className="cards grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCards title="Aporte Inicial: " value={2000.42} icon={"montante_inicial"}/>
          <DashboardCards title="Rendimentos: " value={200.42} icon={"rendimentos"}/>
          <DashboardCards title="Impostos: " value={80.74} icon={"impostos"}/>
          <DashboardCards title="Valor total: " value={2120.1} icon={"valor_total"}/>
        </div>
        <div className="mt-4 w-4/4 h-64 rounded-md bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Investimento</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Rendimento</TableHead>
                <TableHead className="text-center">Valor aplicado</TableHead>
                <TableHead className="text-center">Valor ganho</TableHead>
                <TableHead className="text-center">Data da criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">Investimento renda fixa XP</TableCell>
                <TableCell className="text-center">CDB Pós fixado</TableCell>
                <TableCell className="text-center">230%</TableCell>
                <TableCell className="text-center">R$ 2.000,42</TableCell>
                <TableCell className="text-center">R$ 200,42</TableCell>
                <TableCell className="text-center">29/08/2023</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="mt-4 w-4/4 h-[98%] pr-6 bg-zinc-900 rounded-md">
            <h1 className="text-2xl ml-6 mt-4 mb-2 font-thin">Gráfico de rendimentos:</h1>
            <ResponsiveContainer width="100%" height="70%">
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
          </ResponsiveContainer>
          </div>
          <div className="mt-4 w-4/4 h-[98%] rounded-md bg-zinc-900">
            <h1 className="text-2xl ml-6 mt-4 font-thin">Bancos cadastrados:</h1>
            <div className="w-[95%] items-center ml-4 mt-2">
              <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Nome do banco</TableHead>
                      <TableHead className="text-center">Valor aplicado</TableHead>
                      <TableHead className="text-center">Valor de rendimentos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center">XP Inc.</TableCell>
                      <TableCell className="text-center">R$ 2.000,00</TableCell>
                      <TableCell className="text-center">R$ 200,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">C6 Bank</TableCell>
                      <TableCell className="text-center">R$ 00,00</TableCell>
                      <TableCell className="text-center">R$ 00,00</TableCell>
                    </TableRow>
                  </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default App
