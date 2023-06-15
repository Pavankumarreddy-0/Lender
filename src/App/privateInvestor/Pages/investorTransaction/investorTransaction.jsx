import React, { useState } from "react";
import transactionStyle from "./investorTransaction.module.css";

function InvestorTransaction() {
  const walletData = [
    {
      type: "wallets",
      id: 49,
      attributes: {
        id: 49,
        currency: "GBP",
        balance: {
          sub_units: 90000,
          currency: "GBP",
          formatted: "900.00 GBP",
          monetary: 900,
        },
        committed: {
          sub_units: 70000,
          currency: "GBP",
          formatted: "700.00 GBP",
          monetary: 700,
        },
        free: {
          sub_units: 20000,
          currency: "GBP",
          formatted: "200.00 GBP",
          monetary: 200,
        },
        type: "investors",
        type_title: "Investor",
        is_disabled: false,
        balance_formatted: "900.00 GBP",
        committed_formatted: "700.00 GBP",
        free_formatted: "200.00 GBP",
        created_at: "23 May 2023",
        updated_at: "31 May 2023",
      },
      relationships: {},
      links: {},
    },
  ];

  const transactionData = [
    {
      type: "transactions",
      id: 489,
      attributes: {
        id: 489,
        number: "3gZeUlIsesVdpgkD",
        original_amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        original_currency: "GBP",
        confirmation_number: null,
        date: null,
        currency: "GBP",
        type: "investment",
        status: "processing",
        description: null,
        payment_method: "internal_transfer",
        payment_reference: [],
        credit_wallet_id: 42,
        debit_wallet_id: 49,
        amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        amount_formatted: "500.00 GBP",
        original_amount_formatted: "500.00 GBP",
        status_title: "Paid",
        type_title: "Investment",
        paid_at: "",
        created_at: "31 May 2023 8:05 AM",
        updated_at: "31 May 2023 8:05 AM",
        is_confirmable: false,
        confirmed_at: "",
        payment_qr_supported: false,
      },
    },
    {
      type: "transactions",
      id: 489,
      attributes: {
        id: 489,
        number: "3gZeUlIsesVdpgkD",
        original_amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        original_currency: "GBP",
        confirmation_number: null,
        date: null,
        currency: "GBP",
        type: "investment",
        status: "processing",
        description: null,
        payment_method: "internal_transfer",
        payment_reference: [],
        credit_wallet_id: 42,
        debit_wallet_id: 49,
        amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        amount_formatted: "200.00 GBP",
        original_amount_formatted: "200.00 GBP",
        status_title: "Processing",
        type_title: "Fee",
        paid_at: "",
        created_at: "14 June 2023 9:25 PM",
        updated_at: "14 June 2023 9:25 PM",
        is_confirmable: false,
        confirmed_at: "",
        payment_qr_supported: false,
      },
    },
    {
      type: "transactions",
      id: 489,
      attributes: {
        id: 489,
        number: "3gZeUlIsesVdpgkD",
        original_amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        original_currency: "GBP",
        confirmation_number: null,
        date: null,
        currency: "GBP",
        type: "investment",
        status: "processing",
        description: null,
        payment_method: "internal_transfer",
        payment_reference: [],
        credit_wallet_id: 42,
        debit_wallet_id: 49,
        amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        amount_formatted: "700.00 GBP",
        original_amount_formatted: "700.00 GBP",
        status_title: "Cancelled",
        type_title: "Pay-in",
        paid_at: "",
        created_at: "31 May 2023 8:05 AM",
        updated_at: "31 May 2023 8:05 AM",
        is_confirmable: false,
        confirmed_at: "",
        payment_qr_supported: false,
      },
    },
    {
      type: "transactions",
      id: 489,
      attributes: {
        id: 489,
        number: "3gZeUlIsesVdpgkD",
        original_amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        original_currency: "GBP",
        confirmation_number: null,
        date: null,
        currency: "GBP",
        type: "investment",
        status: "processing",
        description: null,
        payment_method: "internal_transfer",
        payment_reference: [],
        credit_wallet_id: 42,
        debit_wallet_id: 49,
        amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        amount_formatted: "500.00 GBP",
        original_amount_formatted: "500.00 GBP",
        status_title: "Failed",
        type_title: "Fee",
        paid_at: "",
        created_at: "31 March 2023 4:05 AM",
        updated_at: "31 March 2023 4:05 AM",
        is_confirmable: false,
        confirmed_at: "",
        payment_qr_supported: false,
      },
    },
    {
      type: "transactions",
      id: 489,
      attributes: {
        id: 489,
        number: "3gZeUlIsesVdpgkD",
        original_amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        original_currency: "GBP",
        confirmation_number: null,
        date: null,
        currency: "GBP",
        type: "investment",
        status: "processing",
        description: null,
        payment_method: "internal_transfer",
        payment_reference: [],
        credit_wallet_id: 42,
        debit_wallet_id: 49,
        amount: {
          sub_units: 50000,
          currency: "GBP",
          formatted: "500.00 GBP",
          monetary: 500,
        },
        amount_formatted: "100.00 GBP",
        original_amount_formatted: "100.00 GBP",
        status_title: "Pending",
        type_title: "Pay-out",
        paid_at: "",
        created_at: "1 May 2023 6:05 AM",
        updated_at: "1 May 2023 6:05 AM",
        is_confirmable: false,
        confirmed_at: "",
        payment_qr_supported: false,
      },
    },
  ];

  const [filterDataBy, setFilterDataBy] = useState({
    typeBy: "",
  });
  return (
    <div className={transactionStyle["main-class"]}>
      {walletData.map((item, index) => {
        return (
          <div key={index}>
            <div className={transactionStyle["main-head"]}>
              <h3>
                <span>Transaction History</span>{" "}
              </h3>
            </div>
            <div className={transactionStyle["wallet-card"]}>
              <div className={transactionStyle["wallet-total-card"]}>
                <div className={transactionStyle["wallet-number"]}>
                  <p>{item.attributes.balance.formatted}</p>
                </div>
                <div className={transactionStyle["wallet-text"]}>
                  <p>Wallet total balance</p>
                </div>
              </div>
              <div className={transactionStyle["wallet-free-card"]}>
                <div className={transactionStyle["wallet-number"]}>
                  <p>{item.attributes.free.formatted}</p>
                </div>
                <div className={transactionStyle["wallet-text"]}>
                  <p>Wallet free balance</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={transactionStyle["filter-class"]}>
        <label htmlFor="statusCard" className={transactionStyle["LabelClass"]}>
          Filter By
        </label>
        <select
          id="statusCard"
          className={transactionStyle["Inputs_basic-info"]}
          onChange={(e) =>
            setFilterDataBy({
              ...filterDataBy,
              typeBy: e.target.value,
            })
          }
        >
          <option>All</option>
          <option>Paid</option>
          <option>Cancelled</option>
          <option>Pending</option>
          <option>Failed</option>
          <option>Processing</option>
        </select>
      </div>
      <div className={transactionStyle["table-div"]}>
        <table>
          <thead>
            <tr>
              <th>Description(*-Secondary market)</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((data, index) => {
              if (
                data.attributes.status_title === "Processing" ||
                data.attributes.status_title === "Pending"
              ) {
                var text_bg = "#87ceeb";
              } else if (data.attributes.status_title === "Paid") {
                var text_bg = "#39D020";
              } else if (
                data.attributes.status_title === "Failed" ||
                data.attributes.status_title === "Cancelled"
              ) {
                var text_bg = "#FF7456";
              }
              return (
                <tr key={index}>
                  <td>{data.attributes.type_title}</td>
                  <td>{data.attributes.amount_formatted}</td>
                  <td>
                    <span
                      className={transactionStyle["status-bg-color"]}
                      style={{ backgroundColor: text_bg }}
                    >
                      {data.attributes.status_title}
                    </span>
                  </td>
                  <td>{data.attributes.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvestorTransaction;
