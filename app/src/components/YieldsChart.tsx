import { InvestmentsContext } from "@/context/InvestmentsContext"
import { InvestmentsContextProps, ProcessedInvestmentProps } from "@/types/investments"
import { calcDate, calcDateRange, calcInvestmentYield, calcSumDateWDays, calcSumDateWDecimal } from "@/utils"
import React from "react"
import { LineChart,Line, Tooltip, Legend, CartesianGrid,XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function YieldsChart(){

  const {active_investments, total_yield} = React.useContext(InvestmentsContext) as InvestmentsContextProps

  const[data, setData] = React.useState([])

  React.useEffect(()=>{
    chart_date_map()
  },[active_investments])

  const chart_date_map = () => {
    const date_range = calcDateRange(new Date())

    const mapped_data = date_range.map((date) => {
      const formated_date = date.setHours(0, 0, 0, 0)
      const label = (formated_date==new Date().setHours(0, 0, 0, 0)) ? "Hoje" : date.toLocaleDateString()

      if(active_investments){
        let total_gains : number | null = 0
        let previsted_gains : number | null = 0

        const total_gains_array = active_investments.map((investment : ProcessedInvestmentProps) => {
          const formated_date_created = investment.dateCreated.setHours(0, 0, 0, 0)
          const formated_date_deadline = investment.dateDeadline.setHours(0, 0, 0, 0)

          if(formated_date_created>formated_date || formated_date>formated_date_deadline || formated_date>new Date().setHours(0,0,0,0)){
            return 0
          } else {
            return Number(calcInvestmentYield(investment.initialValue, investment.yield/100, calcDate(investment.dateCreated, date), investment.type).toFixed(2))
          }
        })

        for (let index = 0; index < total_gains_array.length; index++) {
          total_gains += total_gains_array[index]
        }

        const previsted_gains_array = active_investments.map((investment : ProcessedInvestmentProps) => {
          const formated_date_created = investment.dateCreated.setHours(0, 0, 0, 0)
          const formated_date_deadline = investment.dateDeadline.setHours(0, 0, 0, 0)

          if(formated_date_created>formated_date || formated_date>formated_date_deadline){
            return 0
          } else {
            return Number(calcInvestmentYield(investment.initialValue, investment.yield/100, calcDate(investment.dateCreated, date), investment.type).toFixed(2))
          }
        })

        for (let index = 0; index < previsted_gains_array.length; index++) {
          previsted_gains += previsted_gains_array[index]
        }

        total_gains = (total_gains==0) ? null : total_gains
        previsted_gains = (previsted_gains==0) ? null : previsted_gains 

        return {
          "name": label,
          "amt":1000,
          "rp":previsted_gains,
          "ra":total_gains
        }

      } else {
        return {
          "name":label,
          "amt": 1000,
          "ra":0,
          "rp":0
        }
      }
    })

    setData(mapped_data)

  }

  return(
      <ResponsiveContainer width="100%" height="70%">
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="Rendimentos previstos" type="monotone" dataKey="rp" stroke="#ae28bf"/>
          <Line name="Rendimentos atuais" type="monotone" dataKey="ra" stroke="#34eb74"/>
        </LineChart>
      </ResponsiveContainer>
  )
}