import React from "react";
import AgreementStyle from "./InvestorAgreements.module.css";

export default function InvestorAgreements() {
  const agreements = [
    {
      type: "platform_agreement_statements",
      id: 3,
      attributes: {
        id: 3,
        locale: "en",
        is_actual: true,
        platform_agreement_version_id: 2,
        statement_version_name: "Test Platform Agreements",
        view_requested_at: "",
        resign_requested_at: "",
        viewed_at: "",
        signed_at: "01 June 2023 12:26 PM",
        created_at: "01 June 2023 12:26 PM",
      },
      relationships: {
        platform_agreement: {
          type: "platform_agreements",
          id: 2,
        },
      },
    },
    {
      type: "platform_agreement_statements",
      id: 23,
      attributes: {
        id: 23,
        locale: "en",
        is_actual: false,
        platform_agreement_version_id: 1,
        statement_version_name: "A sample aggrement",
        view_requested_at: "",
        resign_requested_at: "",
        viewed_at: "",
        signed_at: "07 June 2023 7:51 AM",
        created_at: "07 June 2023 7:51 AM",
      },
      relationships: {
        platform_agreement: {
          type: "platform_agreements",
          id: 1,
        },
      },
    },
  ];
  const categoriesData = [
    {
      type: "investor_category_statements",
      id: 1,
      attributes: {
        id: 1,
        annual_investment_limit: {
          sub_units: 10000000,
          currency: "GBP",
          formatted: "100,000.00 GBP",
          monetary: 100000,
        },
        personal_limit: null,
        is_current: true,
        invested_on_statement: {
          sub_units: 406133200,
          currency: "GBP",
          formatted: "4,061,332.00 GBP",
          monetary: 4061332,
        },
        invested_on_statement_formatted: "4,061,332.00 GBP",
        publish_date: "13 July 2022",
        annual_investment_limit_formatted: "100,000.00 GBP",
        personal_limit_formatted: null,
        download_url:
          "https://api.startup.demo.azcs8.lenderkit.com/v1/investor-categories/statements/1/download",
        statement_version_id: 1,
        statement_version_name: "Retail investor",
        created_at: "23 May 2023",
        updated_at: "23 May 2023",
      },
      relationships: {
        investment_category: {
          type: "investor_categories",
          id: 1,
        },
      },
    },
  ];
  return (
    <div>
      <div className={AgreementStyle["container-class"]}>
        <div>
          <h3 className={AgreementStyle["main-head"]}>
            <span>Agreements</span>
          </h3>
        </div>
        <div className={AgreementStyle["table-div"]}>
          <table>
            <thead>
              <tr>
                <th>Document name</th>
                <th>Publish date</th>
                <th>Accepted on</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.attributes.statement_version_name}
                      <button className={AgreementStyle["icon-class"]}>
                        <i class="fa fa-file-pdf-o"></i>
                      </button>
                      {item.attributes.is_actual === true && (
                        <span className={AgreementStyle["status-bg-color"]}>
                          Active now
                        </span>
                      )}
                    </td>
                    <td>{item.attributes.created_at}</td>
                    <td>{item.attributes.signed_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={AgreementStyle["container-class"]}>
        <div>
          <h3 className={AgreementStyle["main-head"]}>
            <span>Investor Categories statements</span>
          </h3>
        </div>
        <div className={AgreementStyle["table-div"]}>
          <table>
            <thead>
              <tr>
                <th>Document name</th>
                <th>Publish date</th>
                <th>Accepted on</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.attributes.statement_version_name}
                      {item.attributes.is_current === true && (
                        <span className={AgreementStyle["status-bg-color"]}>
                          Active now
                        </span>
                      )}
                    </td>

                    <td>{item.attributes.publish_date}</td>
                    <td>{item.attributes.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
