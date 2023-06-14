import React from "react";
import AgreementStyle from "./InvestorAgreements.module.css";

export default function InvestorAgreements() {
  return (
    <div>
      <h2>Welcome to Agreements</h2>
      <div className={AgreementStyle["container-class"]}>
        <p>Agreement Container</p>
      </div>
    </div>
  );
}
