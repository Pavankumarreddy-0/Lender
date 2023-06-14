import React, { useState } from "react";
import walletStyles from "./investorWallet.module.css";

const data = [
  {
    type: "bank_accounts",
    id: 18,
    attributes: {
      id: 18,
      bank_name: "corporate bank",
      account_type: null,
      account_number: "875412100054962",
      routing_number: null,
      branch_code: null,
      institution_number: null,
      sort_code: null,
      iban: null,
      bic: "BKDNINBBDDR",
      region_code: "other",
      currency: "GBP",
      is_default: false,
      title: null,
      created_at: "31 May 2023",
      updated_at: "31 May 2023",
    },
  },
  {
    type: "bank_accounts",
    id: 18,
    attributes: {
      id: 18,
      bank_name: "syindicate Bank",
      account_type: null,
      account_number: "47582454557586",
      routing_number: null,
      branch_code: null,
      institution_number: null,
      sort_code: null,
      iban: null,
      bic: "SSDSGFDFDCDS",
      region_code: "other",
      currency: "GBP",
      is_default: true,
      title: null,
      created_at: "31 May 2023",
      updated_at: "31 May 2023",
    },
  },
];

function InvestorWallet() {
  const [investorAccounts, setInvestorAccounts] = useState({
    data,
  });
  return (
    <>
      <div className={walletStyles["main-class"]}>
        <div>
          <h3>Wallet</h3>
        </div>
        <div className={walletStyles["wallet-details-box"]}>
          <div className={walletStyles["holder"]}>
            <div>
              <span className={walletStyles["heading"]}>
                Your income to date
              </span>
              <div className={walletStyles["buttons-container"]}>
                <div className={walletStyles["button-class"]}>
                  <button className={walletStyles["slide-button"]}>
                    <span className={walletStyles["button-text"]}>
                      Add Funds
                    </span>
                    <span className={walletStyles["button-icon"]}>+</span>
                  </button>
                </div>
                <div className={walletStyles["button-class"]}>
                  <button className={walletStyles["slide-button"]}>
                    <span className={walletStyles["button-text"]}>
                      Withdraw
                    </span>
                    <span className={walletStyles["button-icon"]}>+</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={walletStyles["value"]}>
              <span className={walletStyles["heading"]}>
                Wallet free balance
              </span>
              <p style={{ fontSize: "28.2609px" }}>2000.00GBP</p>
            </div>
          </div>
        </div>
        <div className={walletStyles["payment-section"]}>
          <div>
            <h4 className={walletStyles["payment_title"]}>
              Your Bank Accounts
            </h4>
            <div>
              {investorAccounts.data.length > 0 ? (
                investorAccounts.data.map((value) => {
                  console.log("value", value.attributes.is_default);
                  return (
                    <>
                      <div className={walletStyles["payment_list"]}>
                        <div className={walletStyles["payment_item"]}>
                          {value.attributes.is_default === false && (
                            <div className={walletStyles["payment_status-new"]}>
                              <button
                                className={walletStyles["slide-button-new"]}
                              >
                                <span
                                  style={{ color: "black" }}
                                  className={walletStyles["button-text"]}
                                >
                                  Set as Default
                                </span>
                              </button>
                            </div>
                          )}
                          {value.attributes.is_default === true && (
                            <div>
                              <div className={walletStyles["payment_status"]}>
                                <span>Default</span>
                              </div>
                            </div>
                          )}

                          <div className={walletStyles["payment_image"]}>
                            <img
                              src="/assets/img/invest.png"
                              alt=""
                              className={walletStyles["card_image"]}
                            ></img>
                          </div>
                          <div className={walletStyles["payment_content"]}>
                            <p className={walletStyles["item_title"]}>
                              Bank name
                            </p>
                            <p className={walletStyles["item_number"]}>
                              {value.attributes.bank_name}
                            </p>
                            <p className={walletStyles["item_title"]}>BIC</p>
                            <p className={walletStyles["item_number"]}>
                              {value.attributes.bic}
                            </p>
                            <p className={walletStyles["item_title"]}>
                              Account number
                            </p>
                            <p className={walletStyles["item_number"]}>
                              {value.attributes.account_number}
                            </p>
                          </div>
                          {value.attributes.is_default === false && (
                            <div className={walletStyles["icon"]}>
                              <button className={walletStyles["close_icon"]}>
                                <i class="bi bi-x"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div>
                  <p>No Accounts Found</p>
                </div>
              )}
              <div className={walletStyles["add-account-container"]}>
                <button className={walletStyles["slide-button"]}>
                  <span
                    style={{ color: "black" }}
                    className={walletStyles["button-text"]}
                  >
                    Add New
                  </span>
                  <span
                    style={{ color: "black" }}
                    className={walletStyles["button-icon"]}
                  >
                    +
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvestorWallet;
