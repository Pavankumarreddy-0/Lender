import React, { useState, useRef, useEffect } from 'react'
import AutoInvestmentsStyles from './autoInvestments.module.css'
import investStyle from '../investorInvestments/investorInvestments.module.css'

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

function AutoInvestmentsCreation({ handleAutoInvestment }) {
    const [investmentCardState, setInvestmentCardState] = useState({
        deals,
    });
    const [monthFileds, setMonthFileds] = useState(false)
    const [intrestRateFileds, setIntrestRateFileds] = useState(false)
    const [amountFileds, setAmountFileds] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [termsAndConditions, setTermsAndConditions] = useState(false)
    const [monthMin, setMonthMin] = useState('')
    const [monthMax, setMonthMax] = useState('')

    const handleMonthsFields = () => {
        setMonthFileds(!monthFileds)
    }

    const handleIntrestFields = () => {
        setIntrestRateFileds(!intrestRateFileds)
    }

    const handleAmoutFields = () => {
        setAmountFileds(!amountFileds)
    }
    const handleMonth = (e) => {
        console.log("handleMonth::", e.target.value);
    }
    const handleIntrestRate = (e) => {
        console.log("handleIntrestRate::", e.target.value);
    }
    const handleAmout = (e) => {
        console.log("handleAmout::", e.target.value);
    }
    const showFilteringResult = () => {
        setShowFilter(true)
    }
    const handleTandC = (e) => {
        if (e.target.checked) {
            setTermsAndConditions(true)
        } else {
            setTermsAndConditions(false)
        }
    }

    const removeFilterResult = () => {
        setTermsAndConditions(false)
        setShowFilter(false)
    }
    return (
        <div className={AutoInvestmentsStyles['auto_investments_Creation']}>
            <div className={AutoInvestmentsStyles['auto_invest_title']}>
                <h3>Auto-Investment</h3>
                <button onClick={handleAutoInvestment}>Back</button>
            </div>

            <div className={AutoInvestmentsStyles['filter_and_balance']}>
                <div className={AutoInvestmentsStyles['available_balance']}>
                    <p className='mb-0 pb-0'>Available balance</p>
                    <h4>185,861.19 GBP</h4>
                </div>

                <div className={AutoInvestmentsStyles['filters']}>
                    <div className='mb-5'>
                        <label>Offering Term, Months</label>
                        <div className={AutoInvestmentsStyles['range_div']}>
                            <div className={AutoInvestmentsStyles['range_div_left']}>
                                <input type='range' min='0' max='48' className='range_of_month' onChange={(e) => handleMonth(e)} />
                            </div>
                            <div className={AutoInvestmentsStyles['range_div_right']}>
                                <p onClick={handleMonthsFields}>{monthFileds ? "Close" : "Custom range"}</p>
                            </div>
                        </div>
                        {
                            monthFileds ? (
                                <div className={AutoInvestmentsStyles['custome_input_filed']}>
                                    <input type='text' placeholder='Minimum Months' />
                                    <input type='text' placeholder='Maximum Months' />
                                </div>
                            ) : ""
                        }
                    </div>
                    <div className='mb-5'>
                        <label>Interest Rate, %</label>
                        <div className={AutoInvestmentsStyles['range_div']}>
                            <div className={AutoInvestmentsStyles['range_div_left']}>
                                <input type='range' min='0' max='20' className='range_of_month' onChange={(e) => handleIntrestRate(e)} />
                            </div>
                            <div className={AutoInvestmentsStyles['range_div_right']}>
                                <p onClick={handleIntrestFields}>{intrestRateFileds ? "Close" : "Custom range"}</p>
                            </div>

                        </div>
                        {
                            intrestRateFileds ? (
                                <div className={AutoInvestmentsStyles['custome_input_filed']}>
                                    <input type='text' placeholder='Minimum Intrest Rate' />
                                    <input type='text' placeholder='Maximum Intrest Rate' />
                                </div>
                            ) : ""
                        }
                    </div>
                    <div className='mb-5'>
                        <label>Investment Amount, GBP</label>
                        <div className={AutoInvestmentsStyles['range_div']}>
                            <div className={AutoInvestmentsStyles['range_div_left']}>
                                <input type='range' min='0' max='10000' className='range_of_month' onChange={(e) => handleAmout(e)} />
                            </div>
                            <div className={AutoInvestmentsStyles['range_div_right']}>
                                <p onClick={handleAmoutFields}>{amountFileds ? "Close" : "Custom range"}</p>
                            </div>
                        </div>
                        {
                            amountFileds ? (
                                <div className={AutoInvestmentsStyles['custome_input_filed']}>
                                    <input type='text' placeholder='Minimum Amount' />
                                    <input type='text' placeholder='Maximum Amount' />
                                </div>
                            ) : ""
                        }
                    </div>
                </div>
                <div className={AutoInvestmentsStyles['filter_btn']}>
                    <button onClick={showFilteringResult}>FILTER</button>
                </div>


                {
                    showFilter ? (
                        <>
                            <div className={AutoInvestmentsStyles['filter_result']}>
                                <div className='text-center'>
                                    <p>1 offerings matched your criteria, you can invest immediately or save settings and we will invest later at next matching session tomorrow.</p>
                                    <div className={AutoInvestmentsStyles["check_box_div"]}>
                                        <input type="checkbox" value={"selected"} onChange={(e) => handleTandC(e)} />
                                        <label htmlFor="flexCheckChecked">
                                            Agree with A sample aggrement
                                        </label>
                                    </div>
                                </div>

                                <div className={AutoInvestmentsStyles['btn_group']}>
                                    {
                                        termsAndConditions ? <button className={AutoInvestmentsStyles['btn_group_btn']}>SAVE SETTING AND INVEST LATER</button> : <button className={AutoInvestmentsStyles['btn_group_con']} disabled>SAVE SETTING AND INVEST LATER</button>
                                    }
                                    {
                                        termsAndConditions ? <button className={AutoInvestmentsStyles['btn_group_btn']}>INVEST IMMEDIATLY</button> : <button className={AutoInvestmentsStyles['btn_group_con']} disabled>INVEST IMMEDIATLY</button>
                                    }


                                    <button className={AutoInvestmentsStyles['btn_group_btn']} onClick={removeFilterResult}>CANCEL</button>
                                </div>
                            </div>

                            <div className={investStyle["auto_investment_main_class"]}>
                                {investmentCardState.deals.length > 0 ? (
                                    investmentCardState.deals.map((e) => {
                                        return (
                                            <div className={investStyle["invest_deal"]}>
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
                    ) : ""
                }
            </div>
        </div>
    )
}

export default AutoInvestmentsCreation;