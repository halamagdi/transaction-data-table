import React, { useContext, useMemo } from "react";
import { useState } from "react";
import style from "./Chart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { dataContext } from "../../../Context/Data.context";
export default function Chart() {
  const { data } = useContext(dataContext);

  const [selectedCustomerId, setSelectedCustomerId] = useState(1);

  const filterData = useMemo(() => {
    const customerTransactions = data.transactions.filter(
      (transaction) => transaction.customer_id === selectedCustomerId
    );

    const filteration = customerTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.date]) {
        acc[transaction.date] = 0;
      }
      acc[transaction.date] += transaction.amount;
      return acc;
    }, {});

    return Object.keys(filteration).map((date) => ({
      date,
      amount: filteration[date],
    }));
  }, [selectedCustomerId]);

  return (
    <div className="overflow-auto mt-5 ml-6 ">
      <label className="font-semibold text-lg flex justify-center ">
        Select Customer:
        <select
          className="w-1/4 mb-5 px-4 py-1 ml-3 rounded-md outline-none shadow-md "
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
        >
          {data.customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex justify-around items-center ">
        <BarChart width={400} height={400} data={filterData} >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar stroke="#8a74f9" fill="#8a74f9" dataKey="amount" />
        </BarChart>

        <AreaChart width={400} height={400} data={filterData} className="mr-6">
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Area stroke="#8a74f9" fill="#8a74f9" dataKey="amount" />
        </AreaChart>
      </div>
    </div>
  );
}
