import React, { useEffect, useState, useContext } from 'react'
import orgHomeStyle from './individualInvestorHomepage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { orderBy, set } from 'lodash'
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CsvDownloadButton from 'react-json-to-csv'
import ColumnResizer from "react-table-column-resizer";
import ExportExcel from 'react-excel-exports'
import Flag from 'react-world-flags'
import { useHotkeys } from 'react-hotkeys-hook'
import { webAppContext } from '../../../../contexts/contexts';
export default function IndividualInvestorHomepage() {
    const navigate = useNavigate();
    const { __webAppSettings, } = useContext(webAppContext);

    const [dataTable, setDataTable] = useState({
        table: [],
        perPage: 10,
        totalRows: -1,
        currentPage: 1,
        showFilter: false,
        showRangeSelector: false,
        filterSearch: "",
        memStatus: "",
        pvLaunchInv: "",
        kycStatus: "",
        invType: "",
        customRange: false,
        filterOn: false,
        loadData: true,
        showColumn: false,
        columnFilter: {
            id: true,
            createdAt: true,
            firstName: true,
            email: true,
            investorType: true,
            membershipStatus: true,
            kycStatus: true,
            privateLaunchInvestor: true,
            dob: true,
            phoneNumber: true,
            countryOfResidence: true,
            createdBy: true
        }
    })

    const sortTableDirection = (e) => {
        let sortColumn = e.target.getAttribute("data-sortColumn");
        let sortDir = e.target.getAttribute("data-sortDirection");
        let sort = "";

        switch (sortDir) {
            case "none":
            case "asc":
                sort = "desc"
                break;
            case "desc":
                sort = "asc"
                break;
        }

        let sortedTable = orderBy([...dataTable.table], [sortColumn], [sort]);
        setDataTable({ ...dataTable, table: sortedTable, sortedColumn: sortColumn });
        e.target.setAttribute("data-sortDirection", sort);

    }

    const paginationNums = () => {
        let pageNum = [];
        let totalPages = Math.ceil(dataTable.totalRows / dataTable.perPage);


        if (dataTable.currentPage < 5) {
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                pageNum.push(i);
            }
        } else {
            let lastNum = dataTable.currentPage + 2;
            for (let i = 0; i < 5; i++) {
                pageNum.push(Math.min(totalPages, lastNum) - i);
            }
            pageNum = pageNum.reverse();
        }

        return pageNum
    }

    const loadShowDataPage = (e) => {
        let nextPage = +(e.target.getAttribute("data-pageNum"));
        setDataTable({ ...dataTable, table: [], totalRows: -1 });

        loadTableData(nextPage);
    }

    const generateFilterMatchesSchema = async () => {
        // if(dataTable.filterOn){
        let matches = {};
        let dateFilter = {};
        let searchQuery = "";

        if (dataTable.customRange) {
            let newTime = dateRange[0].startDate;
            newTime.setTime(dateRange[0].startDate.getTime());
            dateFilter.lt = dateRange[0].endDate;
            dateFilter.gte = newTime
            console.log("updated date", newTime)
        }


        if (dataTable.memStatus != "" && dataTable.memStatus != "all") {
            matches.membershipStatus = dataTable.memStatus
        }

        if (dataTable.pvLaunchInv != "" && dataTable.pvLaunchInv != "all") {
            matches.privateLaunchInvestor = dataTable.pvLaunchInv
        }

        if (dataTable.kycStatus != "" && dataTable.kycStatus != "all") {
            matches.kycStatus = dataTable.kycStatus
        }

        if (dataTable.invType != "" && dataTable.invType != "all") {
            matches.investorType = dataTable.invType
        }


        if (dataTable.filterSearch.length > 0) {
            searchQuery = dataTable.filterSearch;
        }
        return { matches, dateFilter, searchQuery };
        // }else{
        //     return {matches: {}, dateFilter: {}, searchQuery: ""};
        // }
    }

    const loadTableData = async (pageNum) => {

        let { matches, dateFilter, searchQuery } = await generateFilterMatchesSchema();


        await axios.post('/api/individual-investors/', { pageNum, matches, dateFilter, searchQuery, perPage: dataTable.perPage }, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {

            const { result, currentPage } = response.data;
            (result[0].paginatedResults.length > 0 && result[0].totalCount.length > 0) ?
                setDataTable({ ...dataTable, table: result[0].paginatedResults, totalRows: result[0].totalCount[0].count, currentPage: currentPage })
                :
                setDataTable({ ...dataTable, table: [], totalRows: 0, currentPage: 1 })

        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        loadTableData(1);
    }, [])

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const getFormatedRangeDate = () => {
        return dateRange[0].startDate.toLocaleDateString() + " - " + dateRange[0].endDate.toLocaleDateString()
    }

    const showFilteredResults = () => {
        setDataTable({ ...dataTable, filterOn: true })
        loadTableData(dataTable.currentPage);
    }

    const resetFilterResults = async () => {
        setDataTable({
            ...dataTable,
            showRangeSelector: false,
            filterSearch: "",
            memStatus: "",
            pvLaunchInv: "",
            kycStatus: "",
            invType: "",
            customRange: false,
            filterOn: false,
            loadData: !dataTable.loadData
        })
        // await ;
    }

    useEffect(() => {
        loadTableData(dataTable.currentPage)
    }, [dataTable.loadData]);

    useEffect(() => {

    }, [dateRange])

    //hotkeys
    useHotkeys(__webAppSettings.keyboardShortcuts.filterShowAction, (event) => {
        event.preventDefault();
        setDataTable({ ...dataTable, showFilter: !dataTable.showFilter, showColumn: false })
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.columnShowAction, (event) => {
        event.preventDefault();
        setDataTable({ ...dataTable, showFilter: false, showColumn: !dataTable.showColumn })
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.createNewObj, (event) => {
        event.preventDefault();
        navigate('/dashboard/community/individual-investor/create/');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.backButton, (event) => {
        event.preventDefault();
        navigate('/dashboard/community/');
    });


    return (
        <div className={orgHomeStyle["orgHomeModule"]}>
            <div className={orgHomeStyle["orgHomenHeaderContainer"]}>
                <div className={orgHomeStyle["orgHomeHeaderContainerRegion"]}>
                    <Link
                        className={orgHomeStyle["orgHomeHeaderContainerLink"]}
                        to="/dashboard/community/"
                    >
                        <i className="bi bi-arrow-left"></i> Community
                    </Link>
                    <p className={orgHomeStyle["orgHomeHeaderContainerName"]}>
                        Individual Investors
                    </p>
                </div>
                <div className={orgHomeStyle['orgHomeHeaderHeader']}>
                    <Link className={orgHomeStyle['createNewOrgButton']} to="/dashboard/community/individual-investor/create/"><i className="bi bi-plus-square"></i>Create New Individual Investor</Link>

                </div>
            </div>
            <div className={orgHomeStyle["orgHomeFilterRowContainer"]}>
                <div className={orgHomeStyle["orgHomeActionContainer"]}>
                    <button
                        onClick={() => { setDataTable({ ...dataTable, showFilter: !dataTable.showFilter, showColumn: false }) }}
                        className={orgHomeStyle["orgHomeFilterButton"]}
                    ><i className="bi bi-funnel"></i> Filter</button>
                    <button
                        onClick={() => { setDataTable({ ...dataTable, showFilter: false, showColumn: !dataTable.showColumn }) }}
                        className={orgHomeStyle["orgHomeFilterButton"]}
                    ><i class="bi bi-layout-three-columns"></i> Columns</button>
                </div>
                <ExportExcel data={dataTable.table} filename='organizationList' delimiter="," className={orgHomeStyle["orgHomeExportButton"]}><i className="bi bi-file-earmark-arrow-down"></i> </ExportExcel>
            </div>
            <div className={orgHomeStyle["orgHomeOrgTable"]}>
                <div className={orgHomeStyle["dataModuleStyle"]}>

                    {(dataTable.table.length > 0 || dataTable.totalRows != -1) ?
                        <div className={orgHomeStyle["dataModuleOuterCont"]}>
                            {(dataTable.showFilter) &&
                                <div className={orgHomeStyle["dataModuleFilterArea"]}>
                                    <div className={orgHomeStyle["dataModuleFilterAreaInner"]}>
                                        <div className={orgHomeStyle["dataModuleFilterAreaForm"]}>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]} >Search</label>
                                                <input className={orgHomeStyle["dataModuleFilterInput"]} type='text' value={dataTable.filterSearch} onChange={(e) => { setDataTable({ ...dataTable, filterSearch: e.target.value }) }}></input>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Date Range</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { (e.target.value == "custom") ? setDataTable({ ...dataTable, customRange: true }) : setDataTable({ ...dataTable, customRange: false }) }}>
                                                    <option value="anytime">Anytime</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </div>
                                            {(dataTable.customRange) &&
                                                <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                    <label className={orgHomeStyle["dataModuleFilterLabel"]}>Date Range</label>
                                                    <input className={orgHomeStyle["dataModuleFilterInput"]} type='text' value={getFormatedRangeDate()} readOnly
                                                        onClick={() => { setDataTable({ ...dataTable, showRangeSelector: true }) }}
                                                        onFocus={() => { setDataTable({ ...dataTable, showRangeSelector: true }) }}
                                                    ></input>
                                                </div>}
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Type</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, memStatus: e.target.value }) }}>
                                                    <option value="all" selected={(dataTable.memStatus == "all") && "selected"}>All</option>
                                                    <option value="Deleted" selected={(dataTable.memStatus == "Deleted") && "selected"}>Deleted</option>
                                                    <option value="Incomplete" selected={(dataTable.memStatus == "Incomplete") && "selected"}>Incomplete Registration</option>
                                                    <option value="Completed" selected={(dataTable.memStatus == "Completed") && "selected"}>Completed Registration</option>
                                                </select>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Private Launch Investor</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, pvLaunchInv: e.target.value }) }}>
                                                    <option value="all" selected={(dataTable.pvLaunchInv == "all") && "selected"}>All</option>
                                                    <option value="Regular" selected={(dataTable.pvLaunchInv == "Regular") && "selected"}>Regular</option>
                                                    <option value="Private Launch Investor" selected={(dataTable.pvLaunchInv == "Private Launch Investor") && "selected"}>Private Launch Investor</option>
                                                </select>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>KYC Status</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, kycStatus: e.target.value }) }}>
                                                    <option value="all" selected={(dataTable.kycStatus == "all") && "selected"}>All</option>
                                                    <option value="Approved" selected={(dataTable.kycStatus == "Approved") && "selected"}>KYC Approved</option>
                                                    <option value="Blocked" selected={(dataTable.kycStatus == "Blocked") && "selected"}>KYC Blocked</option>
                                                    <option value="AdditionalCheck" selected={(dataTable.kycStatus == "AdditionalCheck") && "selected"}>KYC Refered For Additional Checks</option>
                                                    <option value="Required" selected={(dataTable.kycStatus == "Required") && "selected"}>KYC Required</option>
                                                    <option value="Draft" selected={(dataTable.kycStatus == "Draft") && "selected"}>KYC Verification Process</option>
                                                </select>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Investor Type</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, invType: e.target.value }) }}>
                                                    <option value="all" selected={(dataTable.invType == "all") && "selected"}>All</option>
                                                    <option value="Sophesticated" selected={(dataTable.invType == "Sophesticated") && "selected"}>Sophesticated</option>
                                                    <option value="highNetWorthInvestor" selected={(dataTable.invType == "highNetWorthInvestor") && "selected"}>High Net Worth Investor</option>
                                                    <option value="Restricted" selected={(dataTable.invType == "Restricted") && "selected"}>Restricted</option>
                                                </select>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroupFlexEnd"]}>
                                                <button className={orgHomeStyle["dataModuleFilterResultButton"]} onClick={() => { showFilteredResults() }}>Filter Results</button>
                                                <button className={orgHomeStyle["dataModuleFilterResetButton"]} onClick={() => { resetFilterResults() }}>RemoveFilter</button>
                                            </div>
                                        </div>
                                        {(dataTable.showRangeSelector) && <div className={orgHomeStyle["dataModuleDateRange"]}>
                                            <div
                                                className={orgHomeStyle["dataModuleDateRangeBackdrop"]}
                                                onClick={() => { setDataTable({ ...dataTable, showRangeSelector: false }) }}
                                            ></div>
                                            <div className={orgHomeStyle["rdrCalendarWrapper"]}>
                                                <button className={orgHomeStyle["rdrCalendarWrapperCloseBtn"]} onClick={() => setDataTable({ ...dataTable, showRangeSelector: false })}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                                <DateRangePicker
                                                    editableDateInputs={true}
                                                    displayMode="dateRange"
                                                    onChange={item => { setDateRange([item.selection]); console.log(item.selection) }}
                                                    maxDate={new Date()}
                                                    rangeColors={["rgb(11,74,153)"]}
                                                    ranges={dateRange}
                                                />
                                            </div>
                                        </div>}
                                    </div>
                                </div>}
                            {(dataTable.showColumn) &&
                                <div className={orgHomeStyle["dataModuleFilterArea"]}>
                                    <div className={orgHomeStyle["dataModuleFilterAreaInner"]}>
                                        <div className={orgHomeStyle["dataModuleFilterAreaForm"]}>

                                            <div className={orgHomeStyle["dataModuleColumnOuterGroup"]}>

                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="showOrgId" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.id) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, id: !dataTable.columnFilter.id } }) }}></input>
                                                    <label htmlFor='showOrgId' className={orgHomeStyle["dataModuleColumnLabel"]} >ID</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="createdAt" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.createdAt) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, createdAt: !dataTable.columnFilter.createdAt } }) }}></input>
                                                    <label htmlFor='createdAt' className={orgHomeStyle["dataModuleColumnLabel"]} >Joined At</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="organizationName" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.firstName) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, firstName: !dataTable.columnFilter.firstName } }) }}></input>
                                                    <label htmlFor='organizationName' className={orgHomeStyle["dataModuleColumnLabel"]} >Name</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="organizationtype" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.email) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, email: !dataTable.columnFilter.email } }) }}></input>
                                                    <label htmlFor='organizationtype' className={orgHomeStyle["dataModuleColumnLabel"]} >Email</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="contactPoint" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.investorType) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, investorType: !dataTable.columnFilter.investorType } }) }}></input>
                                                    <label htmlFor='contactPoint' className={orgHomeStyle["dataModuleColumnLabel"]} >Investor Type</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="kybStatus" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.membershipStatus) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, membershipStatus: !dataTable.columnFilter.membershipStatus } }) }}></input>
                                                    <label htmlFor='kybStatus' className={orgHomeStyle["dataModuleColumnLabel"]} >Membership Status</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyNumber" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.kycStatus) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, kycStatus: !dataTable.columnFilter.kycStatus } }) }}></input>
                                                    <label htmlFor='companyNumber' className={orgHomeStyle["dataModuleColumnLabel"]} >KYC/AML Status</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companywebsite" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.privateLaunchInvestor) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, privateLaunchInvestor: !dataTable.columnFilter.privateLaunchInvestor } }) }}></input>
                                                    <label htmlFor='companywebsite' className={orgHomeStyle["dataModuleColumnLabel"]} >Private Launch Investor</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyemail" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.dob) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, dob: !dataTable.columnFilter.dob } }) }}></input>
                                                    <label htmlFor='companyemail' className={orgHomeStyle["dataModuleColumnLabel"]} >Date of Birth</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyphone" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.phoneNumber) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, phoneNumber: !dataTable.columnFilter.phoneNumber } }) }}></input>
                                                    <label htmlFor='companyphone' className={orgHomeStyle["dataModuleColumnLabel"]} >Phone</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="countryOfResidence" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.countryOfResidence) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, countryOfResidence: !dataTable.columnFilter.countryOfResidence } }) }}></input>
                                                    <label htmlFor='countryOfResidence' className={orgHomeStyle["dataModuleColumnLabel"]} >Country of Residence</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="createdBy" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.createdBy) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, createdBy: !dataTable.columnFilter.createdBy } }) }}></input>
                                                    <label htmlFor='createdBy' className={orgHomeStyle["dataModuleColumnLabel"]} >Created By</label>
                                                </div>

                                            </div>

                                            <div className={orgHomeStyle["dataModuleFilterInputGroupFlexEnd"]}>
                                                <button className={orgHomeStyle["dataModuleFilterResultButton"]} onClick={() => {
                                                    setDataTable({
                                                        ...dataTable, columnFilter: {
                                                            id: true,
                                                            createdAt: true,
                                                            firstName: true,
                                                            email: true,
                                                            investorType: true,
                                                            membershipStatus: true,
                                                            kycStatus: true,
                                                            privateLaunchInvestor: true,
                                                            dob: true,
                                                            phoneNumber: true,
                                                            countryOfResidence: true,
                                                            createdBy: true
                                                        }
                                                    })
                                                }}>Select All</button>
                                            </div>
                                        </div>
                                        {(dataTable.showRangeSelector) && <div className={orgHomeStyle["dataModuleDateRange"]}>
                                            <div
                                                className={orgHomeStyle["dataModuleDateRangeBackdrop"]}
                                                onClick={() => { setDataTable({ ...dataTable, showRangeSelector: false }) }}
                                            ></div>
                                            <div className={orgHomeStyle["rdrCalendarWrapper"]}>
                                                <button className={orgHomeStyle["rdrCalendarWrapperCloseBtn"]} onClick={() => setDataTable({ ...dataTable, showRangeSelector: false })}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                                <DateRangePicker
                                                    editableDateInputs={true}
                                                    displayMode="dateRange"
                                                    onChange={item => { setDateRange([item.selection]); console.log(item.selection) }}
                                                    maxDate={new Date()}
                                                    rangeColors={["rgb(11,74,153)"]}
                                                    ranges={dateRange}
                                                />
                                            </div>
                                        </div>}
                                    </div>
                                </div>}
                            <div className={orgHomeStyle["dataModuleDataPrev"]} style={(dataTable.showFilter || dataTable.showColumn) ? { width: "calc(100% - 250px)" } : { width: "100%" }}>
                                <div className={orgHomeStyle["dataModuleStyleInner"]}>
                                    {
                                        (dataTable.totalRows == 0) && <div className={orgHomeStyle["dataModuleNoResults"]}>
                                            No results found
                                        </div>
                                    }
                                    <table className="table table-striped">
                                        <thead className={orgHomeStyle["dataModuleThead"]}>
                                            <tr className={orgHomeStyle["dataModuleTheadrow"]}>

                                                {(dataTable.columnFilter.id) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="_id" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>ID</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.createdAt) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="createdAt" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Joined At</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.firstName) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="firstName" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Name</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.email) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="email" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Email</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.investorType) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="investorType" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Investor Type</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {
                                                    (dataTable.columnFilter.membershipStatus) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                        <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="membershipStatus" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                        <div className={orgHomeStyle["dataModuleThInner"]}><span>Membership Status</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                        </div>
                                                    </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>
                                                }

                                                {(dataTable.columnFilter.kycStatus) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="kycStatus" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>KYC/AML Status</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.privateLaunchInvestor) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="privateLaunchInvestor" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Private Launch Investor</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.dob) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="dob" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Date of Birth</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.phoneNumber) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="phoneNumber" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Phone</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.countryOfResidence) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="countryOfResidence" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Country of Residence</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}


                                                {(dataTable.columnFilter.createdBy) && <> <th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="creatorUsername" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Created By</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Action</span>
                                                    </div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className={orgHomeStyle["dataModuleTbody"]}>
                                            {
                                                dataTable.table.map(e => {
                                                    return <tr className={orgHomeStyle["dataModuleTbodyrow"]}>

                                                        {(dataTable.columnFilter.id) && <><td className={orgHomeStyle["dataModuleTd"]}>{e._id}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.createdAt) && <><td className={orgHomeStyle["dataModuleTd"]}>{new Date(e.createdAt).toLocaleString()}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.firstName) && <><td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/community/individual-investor/view/" + e._id}>{e.title + e.firstName + " " + e.lastName}</Link></td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.email) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.email}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.investorType) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.investorType}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.membershipStatus) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.membershipStatus}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.kycStatus) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.kycStatus}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.privateLaunchInvestor) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.privateLaunchInvestor}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.dob) && <><td className={orgHomeStyle["dataModuleTd"]}>{new Date(e.dob).toLocaleDateString()}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.phoneNumber) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.phoneNumber}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.countryOfResidence) && <><td className={orgHomeStyle["dataModuleTd"]}> <Flag className={orgHomeStyle["countryFlag"]} code={e.countryOfResidence} /> {e.countryOfResidence}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.createdBy) && <><td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/admin/view/" + e.createdBy}>{e.creatorUsername}</Link></td><td className="columnResizer" /></>}
                                                        <td className={orgHomeStyle["dataModuleTd"]}>

                                                            {
                                                                (e.organizationInterest == "Fundraising") ?
                                                                    <Link to={"/dashboard/organization/view/" + e._id}><i class="bi bi-card-checklist"></i></Link>
                                                                    :
                                                                    <Link to={"/dashboard/organization/view/" + e._id}><i class="bi bi-piggy-bank"></i></Link>
                                                            }

                                                        </td>

                                                    </tr>

                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={orgHomeStyle['dataModuleFooter']}>
                                    <div className={orgHomeStyle['dataModulePageShow']}>
                                        Showing page <b>{dataTable.currentPage}</b> of <b>{Math.ceil(dataTable.totalRows / dataTable.perPage)}</b>
                                    </div>
                                    <div className={orgHomeStyle['dataModulePagination']}>
                                        {
                                            paginationNums().map(e => {
                                                return <a className={orgHomeStyle[(dataTable.currentPage == e) ? "currentPage" : "navPage"]} href='javascript:void(0)' onClick={(e) => loadShowDataPage(e)} data-pageNum={e} >{e}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={orgHomeStyle["dataModuleOuterCont"]}>
                            <div className={orgHomeStyle["dataModuleDataPrev"]}>
                                <div className={orgHomeStyle["dataModuleStyleInner"]}>
                                    <table className="table table-striped placeholder-glow">
                                        <thead className={orgHomeStyle["dataModuleThead"]}>
                                            <tr className={orgHomeStyle["dataModuleTheadrow"]}>
                                                {
                                                    ["", "", "", "", ""].map(e => {
                                                        return <th className={orgHomeStyle["dataModuleTh"]}  ><div className='placeholder col-4 data-table-placeholder'></div></th>
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody className={orgHomeStyle["dataModuleTbody"]}>

                                            {
                                                ["", "", "", "", "", "", "", "", "", "", "", ""].map(e => {
                                                    return <tr className={orgHomeStyle["dataModuleTbodyrow"]}>
                                                        {
                                                            ["", "", "", "", ""].map(c => {
                                                                return <td className={orgHomeStyle["dataModuleTd"]}><div className='placeholder col-4 data-table-placeholder'></div></td>
                                                            })
                                                        }
                                                    </tr>

                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={orgHomeStyle['dataModuleFooter']}>
                                    <div className={orgHomeStyle['dataModulePageShow']}>
                                        Showing page <b>{dataTable.currentPage}</b> of <b>{Math.ceil(dataTable.totalRows / dataTable.perPage)}</b>
                                    </div>
                                    <div className={orgHomeStyle['dataModulePagination']}>
                                        {
                                            paginationNums().map(e => {
                                                return <a className={orgHomeStyle[(dataTable.currentPage == e) ? "currentPage" : "navPage"]} href='javascript:void(0)' onClick={(e) => loadShowDataPage(e)} data-pageNum={e} >{e}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
