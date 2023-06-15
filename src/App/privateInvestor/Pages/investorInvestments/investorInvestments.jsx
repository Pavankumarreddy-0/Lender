import React, { useState } from "react";
import investStyle from "./investorInvestments.module.css";

const deals = [
  {
    id: "12345",
    dealImg: "https://picsum.photos/500?random=1",
    dealCat: "EQUITY",
    dealStatus: "Processing",
    dealName: "Yachtico",
    dealType: "Funding",
    dealAddr: "67, Union Group, London, UK",
    dealSharesCount: 50,
    pricePerShare: 40,
    soldShare: 30,
    agreement: [
      {
        docName: "Primary Agreement",
        docId: "12345",
      },
    ],
    investmentDate: new Date(),
    investedAmount: 5000,
  },
  {
    id: "78901",
    dealImg: "https://picsum.photos/500?random=2",
    dealCat: "DEBT",
    dealStatus: "Processing",
    dealName: "Energelies",
    dealType: "Funding",
    dealAddr: "67, James Street,Ukraine",
    dealSharesCount: 300,
    pricePerShare: 10,
    soldShare: 70,
    agreement: [],
    investmentDate: new Date(),
    investedAmount: 2000,
  },
];

function InvestorInvestments() {
  const [investmentCardState, setInvestmentCardState] = useState({
    deals,
  });
  const [typeData, setTypeData] = useState({
    typeStatus: "",
    offeringType: "",
  });
  return (
    <>
      <div className={investStyle["main-class"]}>
        <div className={investStyle["main-head"]}>
          <h3>
            <span>Investments:</span>{" "}
            <span style={{ color: "#FF7456" }}> 2 Investments</span>
          </h3>
        </div>
        <div className={investStyle["wallet-card"]}>
          <div className={investStyle["wallet-total-card"]}>
            <div className={investStyle["wallet-number"]}>
              <p>900.00GBP</p>
            </div>
            <div className={investStyle["wallet-text"]}>
              <p>Wallet total balance</p>
            </div>
          </div>
          <div className={investStyle["wallet-free-card"]}>
            <div className={investStyle["wallet-number"]}>
              <p>200.00GBP</p>
            </div>
            <div className={investStyle["wallet-text"]}>
              <p>Wallet free balance</p>
            </div>
          </div>
        </div>
      </div>
      <div className={investStyle["wallet-card"]}>
        <div className={investStyle["main-class"]}>
          <label htmlFor="statusCard" className={investStyle["LabelClass"]}>
            Funding Status
          </label>
          <select
            id="statusCard"
            className={investStyle["Inputs_basic-info"]}
            onChange={(e) =>
              setTypeData({
                ...typeData,
                typeStatus: e.target.value,
              })
            }
          >
            <option>All</option>
            <option>Paid</option>
            <option>Cancelled</option>
            <option>Settled</option>
            <option>Rejected</option>
            <option>Sold</option>
          </select>
        </div>
        <div className={investStyle["main-class"]}>
          <label htmlFor="statusCard" className={investStyle["LabelClass"]}>
            Offering Type
          </label>
          <select
            id="statusCard"
            className={investStyle["Inputs_basic-info"]}
            onChange={(e) =>
              setTypeData({
                ...typeData,
                offeringType: e.target.value,
              })
            }
          >
            <option>All</option>
            <option>Debt</option>
            <option>Donation</option>
            <option>Equity</option>
          </select>
        </div>
      </div>
      <div className={investStyle["main-class"]}>
        {investmentCardState.deals.length > 0 ? (
          investmentCardState.deals.map((e, id) => {
            return (
              <div key={id} className={investStyle["invest_deal"]}>
                <div className={investStyle["invest_prev"]}>
                  <img
                    className={investStyle["invest_img"]}
                    src={e.dealImg}
                    alt=""
                  />
                  <div className={investStyle["invest_deal_labels"]}>
                    <span className={investStyle["invest_deal_label"]}>
                      {e.dealStatus}
                    </span>
                    <span className={investStyle["invest_deal_label"]}>
                      {e.dealCat}
                    </span>
                  </div>
                </div>
                <div className={investStyle["invest_meta"]}>
                  <div className={investStyle["invest_meta_Inner"]}>
                    <div className={investStyle["invest_meta_flex_wrap"]}>
                      <div className={investStyle["invest_meta_left_grp"]}>
                        <div className={investStyle["invest_meta_header_top"]}>
                          <h3
                            className={
                              investStyle["invest_meta_deal_name_title"]
                            }
                          >
                            {e.dealName}
                          </h3>
                          <span
                            className={investStyle["invest_meta_deal_type"]}
                          >
                            {e.dealType}
                          </span>
                        </div>
                        {"dealAddr" in e && (
                          <p className={investStyle["invest_meta_deal_addr"]}>
                            {e.dealAddr}
                          </p>
                        )}
                      </div>
                      <div className={investStyle["invest_meta_right_grp"]}>
                        <div className={investStyle["invest_meta_progress"]}>
                          <span
                            className={
                              investStyle["invest_meta_deal_percentage"]
                            }
                          >
                            {((e.soldShare / e.dealSharesCount) * 100).toFixed(
                              2
                            )}
                            %
                          </span>
                          <span
                            className={investStyle["invest_meta_deal_title"]}
                          >
                            {e.soldShare * e.pricePerShare} GBP /{" "}
                            {e.dealSharesCount * e.pricePerShare} GBP
                          </span>
                        </div>
                        <div className={investStyle["goal_progress"]}>
                          <div
                            className={investStyle["goal_prgrs"]}
                            style={{
                              width:
                                (e.soldShare / e.dealSharesCount) * 100 + "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className={investStyle["invest_meta_items"]}>
                      <div className={investStyle["invest_meta_item"]}>
                        <div className={investStyle["invest_meta_key"]}>
                          Number of Shares :
                        </div>
                        <div className={investStyle["invest_meta_value"]}>
                          {e.dealSharesCount}
                        </div>
                      </div>
                      <div className={investStyle["invest_meta_item"]}>
                        <div className={investStyle["invest_meta_key"]}>
                          Price Per Share:
                        </div>
                        <div className={investStyle["invest_meta_value"]}>
                          {e.pricePerShare} GBP
                        </div>
                      </div>
                    </div>
                    {e.agreement.length > 0 && (
                      <div className={investStyle["invest_docs_list"]}>
                        {e.agreement.map((doc) => {
                          return (
                            <div className={investStyle["invest_doc"]}>
                              <div className={investStyle["invest_doc_name"]}>
                                <i className="bi bi-file-earmark-text"></i>
                                <span
                                  className={investStyle["invest_doc_title"]}
                                >
                                  {doc.docName}
                                </span>
                              </div>
                              <div
                                className={investStyle["invest_doc_download"]}
                              >
                                <a
                                  href="/"
                                  className={investStyle["invest_doc_link"]}
                                >
                                  <i className="bi bi-download"></i>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {"investmentDate" in e && (
                      <div className={investStyle["invest_meta-footer"]}>
                        <h4 className={investStyle["investDate"]}>
                          Invested on {e.investmentDate.toDateString()}
                        </h4>
                        <h4 className={investStyle["investAmount"]}>
                          {e.investedAmount} GBP
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className={investStyle["plain-text"]}>
              <p>There are no investments yet.</p>
              <p style={{ fontSize: "18px" }}>
                The list of investments will be shown here once you start
                investing.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default InvestorInvestments;
