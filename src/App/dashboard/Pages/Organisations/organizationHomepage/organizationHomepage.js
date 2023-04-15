import React, { useEffect, useState, useContext } from 'react'
import orgHomeStyle from './organizationHomepage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { orderBy, set } from 'lodash'
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CsvDownloadButton from 'react-json-to-csv'
import ColumnResizer from "react-table-column-resizer";
import ExportExcel from 'react-excel-exports'
import { useHotkeys } from 'react-hotkeys-hook'
import { webAppContext } from '../../../../contexts/contexts';
export default function OrganizationHomepage() {
    const navigate = useNavigate();
    const [dataTable, setDataTable] = useState({
        table: [],
        perPage: 10,
        totalRows: -1,
        currentPage: 1,
        showFilter: false,
        showRangeSelector: false,
        filterSearch: "",
        typeOption: "",
        kybStaus: "",
        customRange: false,
        filterOn: false,
        loadData: true,
        showColumn: false,
        columnFilter: {
            orgID: true,
            createdAt: true,
            organizationName: true,
            type: true,
            contactPoint: true,
            kybStatus: true,
            companyNumber: true,
            website: true,
            email: true,
            phone: true,
            createdBy: true
        }
    })

    const { __webAppSettings, } = useContext(webAppContext);

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


        if (dataTable.typeOption != "" && dataTable.typeOption != "all") {
            matches.organizationInterest = dataTable.typeOption
        }

        if (dataTable.kybStaus != "" && dataTable.kybStaus != "all") {
            matches.kybStatus = dataTable.kybStaus
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


        await axios.post('/api/organizations/', { pageNum, matches, dateFilter, searchQuery, perPage: dataTable.perPage }, {
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
            typeOption: "",
            kybStaus: "",
            customRange: false,
            filterOn: false,
            loadData: !dataTable.loadData
        })
        // await ;
    }

    useEffect(() => {

    }, [__webAppSettings.keyboardShortcuts])

    useEffect(() => {
        loadTableData(dataTable.currentPage)
    }, [dataTable.loadData]);

    useEffect(() => {

    }, [dateRange])

    //hotkeys
    useHotkeys(__webAppSettings.keyboardShortcuts.filterShowAction, (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDataTable({ ...dataTable, showFilter: !dataTable.showFilter, showColumn: false })
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.columnShowAction, (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDataTable({ ...dataTable, showFilter: false, showColumn: !dataTable.showColumn })
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.createNewObj, (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate('/dashboard/community/organizations/create/');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.backButton, (event) => {
        event.preventDefault();
        event.stopPropagation();
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
                        Organizations
                    </p>
                </div>
                <div className={orgHomeStyle['orgHomeHeaderHeader']}>
                    <Link className={orgHomeStyle['createNewOrgButton']} to="/dashboard/community/organizations/create"><i className="bi bi-plus-square"></i>Create New Organization</Link>

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
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, typeOption: e.target.value }) }}>
                                                    <option value="all" selected={(dataTable.typeOption == "all") && "selected"}>All</option>
                                                    <option value="Fundraising" selected={(dataTable.typeOption == "Fundraising") && "selected"}>Fundraising</option>
                                                    <option value="Investing" selected={(dataTable.typeOption == "Investing") && "selected"}>Investing</option>
                                                </select>
                                            </div>
                                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>KYB Status</label>
                                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e) => { setDataTable({ ...dataTable, kybStaus: e.target.value }) }}>
                                                    <option value="all">All</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Blocked">Blocked</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Draft">Draft</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Referred_checks">Referred for additional checks</option>
                                                    <option value="Submitted">Submitted</option>
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
                                                    <input id="showOrgId" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.orgID) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, orgID: !dataTable.columnFilter.orgID } }) }}></input>
                                                    <label htmlFor='showOrgId' className={orgHomeStyle["dataModuleColumnLabel"]} >Org ID</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="createdAt" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.createdAt) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, createdAt: !dataTable.columnFilter.createdAt } }) }}></input>
                                                    <label htmlFor='createdAt' className={orgHomeStyle["dataModuleColumnLabel"]} >Created At</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="organizationName" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.organizationName) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, organizationName: !dataTable.columnFilter.organizationName } }) }}></input>
                                                    <label htmlFor='organizationName' className={orgHomeStyle["dataModuleColumnLabel"]} >Organization Name</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="organizationtype" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.type) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, type: !dataTable.columnFilter.type } }) }}></input>
                                                    <label htmlFor='organizationtype' className={orgHomeStyle["dataModuleColumnLabel"]} >Organization Type</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="contactPoint" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.contactPoint) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, contactPoint: !dataTable.columnFilter.contactPoint } }) }}></input>
                                                    <label htmlFor='contactPoint' className={orgHomeStyle["dataModuleColumnLabel"]} >Contact Point</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="kybStatus" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.kybStatus) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, kybStatus: !dataTable.columnFilter.kybStatus } }) }}></input>
                                                    <label htmlFor='kybStatus' className={orgHomeStyle["dataModuleColumnLabel"]} >KYB Status</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyNumber" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.companyNumber) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, companyNumber: !dataTable.columnFilter.companyNumber } }) }}></input>
                                                    <label htmlFor='companyNumber' className={orgHomeStyle["dataModuleColumnLabel"]} >Company Number</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companywebsite" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.website) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, website: !dataTable.columnFilter.website } }) }}></input>
                                                    <label htmlFor='companywebsite' className={orgHomeStyle["dataModuleColumnLabel"]} >Website</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyemail" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.email) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, email: !dataTable.columnFilter.email } }) }}></input>
                                                    <label htmlFor='companyemail' className={orgHomeStyle["dataModuleColumnLabel"]} >Email</label>
                                                </div>
                                                <div className={orgHomeStyle["dataModuleColumnGroup"]}>
                                                    <input id="companyphone" className={orgHomeStyle["dataModuleColumnInput"]} type='checkbox' checked={(dataTable.columnFilter.phone) && "checked"} onChange={(e) => { setDataTable({ ...dataTable, columnFilter: { ...dataTable.columnFilter, phone: !dataTable.columnFilter.phone } }) }}></input>
                                                    <label htmlFor='companyphone' className={orgHomeStyle["dataModuleColumnLabel"]} >Phone</label>
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
                                                            orgID: true,
                                                            createdAt: true,
                                                            organizationName: true,
                                                            type: true,
                                                            contactPoint: true,
                                                            kybStatus: true,
                                                            companyNumber: true,
                                                            website: true,
                                                            email: true,
                                                            phone: true,
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

                                                {(dataTable.columnFilter.orgID) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="_id" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Org ID</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.createdAt) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="createdAt" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Created At</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {(dataTable.columnFilter.organizationName) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="name" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Organization Name</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}

                                                {
                                                    (dataTable.columnFilter.type) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                        <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="organizationInterest" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                        <div className={orgHomeStyle["dataModuleThInner"]}><span>Type</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                        </div>
                                                    </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>
                                                }

                                                {(dataTable.columnFilter.contactPoint) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="firstName" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Contact Point</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                {(dataTable.columnFilter.kybStatus) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="kybStatus" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>KYB Status</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                {(dataTable.columnFilter.companyNumber) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="companyNumber" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Company Number</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                {(dataTable.columnFilter.website) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="website" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Website</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                {(dataTable.columnFilter.email) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="email" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Email</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                                    </div>
                                                </th><ColumnResizer className="columnResizer" > </ColumnResizer> </>}
                                                {(dataTable.columnFilter.phone) && <><th className={orgHomeStyle["dataModuleTh"]}  >
                                                    <div onClick={(e) => { sortTableDirection(e) }} data-sortColumn="phone" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Phone</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
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

                                                        {(dataTable.columnFilter.orgID) && <><td className={orgHomeStyle["dataModuleTd"]}>{e._id}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.createdAt) && <><td className={orgHomeStyle["dataModuleTd"]}>{new Date(e.createdAt).toLocaleDateString()}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.organizationName) && <><td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/community/organizations/view/" + e._id}>{e.name}</Link></td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.type) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.organizationInterest}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.contactPoint) && <><td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/users/view/" + e.contactPoint}>{e.firstName + " " + e.lastName}</Link></td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.kybStatus) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.kybStatus}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.companyNumber) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.companyNumber}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.website) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.website}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.email) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.email}</td><td className="columnResizer" /></>}
                                                        {(dataTable.columnFilter.phone) && <><td className={orgHomeStyle["dataModuleTd"]}>{e.phone}</td><td className="columnResizer" /></>}
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
