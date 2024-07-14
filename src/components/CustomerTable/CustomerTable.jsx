import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import style from "./CustomerTable.module.css";
import DataTable from "react-data-table-component";
import { dataContext } from "../../../Context/Data.context";

export default function CustomerTable() {
  const [filterText, setFilterText] = useState("");
  let { data } = useContext(dataContext);
  const [columns, setColumns] = useState([
    {
      name: "ID",
      selector: (row) => row.customer_id,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ]);

  const customers = data.customers;
  const transactions = data.transactions;

  const newData = useMemo(
    () =>
      transactions.map((transaction) => ({
        ...transaction,
        customer_name:
          customers.find((c) => c.id === transaction.customer_id)?.name ||
          "Unknown",
      })),
    [transactions, customers]
  );

  const filteredTransactions = useMemo(() => {
    return newData.filter((transaction) => {
      const nameMatch = transaction.customer_name
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const amountMatch = transaction.amount
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());

      return nameMatch || amountMatch;
    });
  }, [filterText, newData]);

  function handleFilter(e) {
    setFilterText(e.target.value);
  }
  const customStyle = {
    rows: {
      style: {
        color: "#8a74f9",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        color: "#8a74f9",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
      },
    },
  };

  return (
    <>
      <div className="overflow-auto w-4/5 mx-auto">
        <div className="text-right my-6 mr-3 ">
          <input
            className="w-full md:w-1/5 xl:w-1/4 py-2 pl-2 rounded-lg outline-none shadow-md"
            type="text"
            placeholder="Filter ..."
            value={filterText}
            onChange={handleFilter}
          />
        </div>
        <div className="container">
          <DataTable
            columns={columns}
            data={filteredTransactions}
            fixedHeader
            pagination
            striped={true}
            highlightOnHover
            customStyles={customStyle}
          ></DataTable>
        </div>
      </div>
    </>
  );
}
