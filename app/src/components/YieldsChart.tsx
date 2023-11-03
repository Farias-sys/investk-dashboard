import { InvestmentsContext } from "@/context/InvestmentsContext"
import { InvestmentsContextProps, ProcessedInvestmentProps } from "@/types/investments"
import { calcDate, calcDateRange, calcInvestmentYield, calcSumDateWDays, calcSumDateWDecimal } from "@/utils"
import React from "react"
import { LineChart,Line, Tooltip, Legend, CartesianGrid,XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function YieldsChart(){
  // const {active_investments, total_yield} = React.useContext(InvestmentsContext) as InvestmentsContextProps

  const data = [{}]

  // const chart_date_map = () => {
  //   const date_range = calcDateRange(new Date())
  //   return date_range.map((date) => {
  //     const formated_date = date.setHours(0, 0, 0, 0)
  //     const label = (formated_date==new Date().setHours(0, 0, 0, 0)) ? "Hoje" : date.toLocaleDateString()

  //     if(active_investments){

  //       const total_gains_array = active_investments.map((investment : ProcessedInvestmentProps) => {
  //         const investment_deadline = calcSumDateWDecimal(investment.dateCreated, investment.planedInterval).setHours(0, 0, 0, 0)
          
  //         if(new Date(investment.dateCreated).setHours(0, 0, 0, 0)>formated_date || formated_date>investment_deadline){
  //           return 0
  //         } else {
  //           return calcInvestmentYield(investment.initialValue, investment.yield/100, calcDate(date, new Date(investment.dateCreated)), investment.type)
  //         }
  //       })
  //       console.log(total_gains_array)
  //       let total_gains : number = 0
  //       for (let index = 0; index < total_gains_array.length; index++) {
  //         total_gains += total_gains_array[index];
          
  //       }

  //       return {
  //         "name":label,
  //         "amt": 1000,
  //         "ra":total_gains,
  //         "rp":0
  //       }
  //     } else {
  //         return {
  //           "name":label,
  //           "amt": 1000,
  //           "ra":0,
  //           "rp":0
  //         }
  //       }

  //     })
  // }

  // let data = chart_date_map()

  return(
      <ResponsiveContainer width="100%" height="70%">
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="Rendimentos atuais" type="monotone" dataKey="ra" stroke="#34eb74"/>
          <Line name="Rendimentos previstos" type="monotone" dataKey="rp" stroke="#8884d8"/>
        </LineChart>
      </ResponsiveContainer>
  )
}