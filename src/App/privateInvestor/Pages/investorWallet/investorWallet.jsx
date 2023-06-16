import React, { useState } from "react";
import walletStyles from "./investorWallet.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => setOpen(false);
  const openPopUp = () => setOpen(true);

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
                investorAccounts.data.map((value, index) => {
                  return (
                    <>
                      <div key={index} className={walletStyles["payment_list"]}>
                        <div className={walletStyles["payment_item"]}>
                          {value.attributes.is_default === false && (
                            <div className={walletStyles["payment_status-new"]}>
                              <button
                                className={walletStyles["slide-button-new"]}
                                onClick={openPopUp}
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
                              <button
                                className={walletStyles["close_icon"]}
                                onClick={handleShow}
                              >
                                <i className="bi bi-x"></i>
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
                <button className={walletStyles["slide-button"]} >
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Conformation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please confirm deleting the bank account.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={open} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Conformation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please confirm the update of the bank account.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default InvestorWallet;
