import { useState } from "react";
import "./App.css";
import CustomerTable from "./components/CustomerTable/CustomerTable";
import Chart from "./components/Chart/Chart";
import DataProvider from "../Context/Data.context";

function App() {
  return (
    <>
      <div className="h-screen text-gray-900 bg-gray-200 overflow-auto">
        <DataProvider>
          <Chart />
          <CustomerTable />
        </DataProvider>
      </div>
    </>
  );
}

export default App;
