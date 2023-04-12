import React, { useEffect, useState } from 'react'
import orgHomeStyle from './organizationHomepage.module.css'
import { Link } from 'react-router-dom'
import { orderBy, set } from 'lodash'
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CsvDownloadButton from 'react-json-to-csv'

export default function OrganizationHomepage() {

    const [dataTable, setDataTable] = useState({
        table: [],
        perPage: 10,
        totalRows: -1,
        currentPage: 1,
        showFilter: false,
        showRangeSelector: false,
        filterSearch:"",
        typeOption: "",
        kybStaus: "",
        customRange: false,
        filterOn: false
    }) 

    const sortTableDirection = (e) => {
        let sortColumn = e.target.getAttribute("data-sortColumn");
        let sortDir = e.target.getAttribute("data-sortDirection");
        let sort = "";

        switch(sortDir){
            case "none":
            case "asc":
                sort = "desc"
                break;
            case "desc":
                sort = "asc"
                break;
        }

        let sortedTable = orderBy([...dataTable.table], [sortColumn],[sort]);
        setDataTable({...dataTable, table: sortedTable, sortedColumn: sortColumn});
        e.target.setAttribute("data-sortDirection", sort);

    }

    const paginationNums = () => {
        let pageNum = [];
        let totalPages = Math.ceil(dataTable.totalRows / dataTable.perPage);
        

        if(dataTable.currentPage < 5){
            for(let i=1;i<= Math.min(totalPages,5); i++){
                pageNum.push(i);
            }            
        }else{
            let lastNum = dataTable.currentPage + 2;
            for(let i=0;i < 5;i++){
                pageNum.push(Math.min(totalPages,lastNum) - i);
            }
            pageNum = pageNum.reverse();
        }   

        return pageNum
    }

    const loadShowDataPage = (e) => {
        let nextPage = +(e.target.getAttribute("data-pageNum"));
        setDataTable({...dataTable, table: [], totalRows: -1});
        
        loadTableData(nextPage);
    }

    const generateFilterMatchesSchema = async () => {
        // if(dataTable.filterOn){
            let matches = {};
            let dateFilter = {}

            //TODO solve the date end issue
            if(dataTable.customRange){
                let newTime = dateRange[0].startDate;
                newTime.setTime(dateRange[0].startDate.getTime());
                // matches.createdAt = {
                //     $lt: dateRange[0].endDate ,
                //     $gte: newTime
                // }
                dateFilter.lt = dateRange[0].endDate;
                dateFilter.gte = newTime
                console.log("updated date", newTime)
            }


            if(dataTable.typeOption != "" && dataTable.typeOption != "all") {
                matches.organizationInterest = dataTable.typeOption
            }
            
            if(dataTable.kybStaus != "" && dataTable.kybStaus != "all") {
                matches.kybStatus = dataTable.kybStaus
            }

           
            // if(dataTable.filterSearch.length > 0){

            // }
            console.log(matches);
            return {matches, dateFilter};
        // }else{
        //     return {};
        // }
    }

    const loadTableData = async (pageNum) => {

        let {matches, dateFilter} = await generateFilterMatchesSchema();
        

        await axios.post('/api/organizations/', { pageNum , matches, dateFilter , perPage: dataTable.perPage},{
            headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
        }).then(response => {
  
            const { result, currentPage } = response.data;
            console.log(result,currentPage, 'loaded data');
            (result[0].paginatedResults.length > 0 && result[0].totalCount.length > 0) ?
                setDataTable({...dataTable, table: result[0].paginatedResults, totalRows: result[0].totalCount[0].count, currentPage: currentPage})
            :
                setDataTable({...dataTable, table: [], totalRows: 0, currentPage: 1})
            
        }).catch(error => {
            console.error(error);
      })
    }

    useEffect(()=>{
        loadTableData(1);
    },[])

    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    
    const getFormatedRangeDate = ()=> {
        return dateRange[0].startDate.toLocaleDateString() + " - " +dateRange[0].endDate.toLocaleDateString()
    }

    const showFilteredResults = () => {
        setDataTable({...dataTable, filterOn: true})
        loadTableData(dataTable.currentPage);
    }

    useEffect(()=>{

    },[dateRange])

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
        <button 
            onClick={()=>{  setDataTable({...dataTable, showFilter: !dataTable.showFilter}) }} 
            className={orgHomeStyle["orgHomeFilterButton"]}
        ><i className="bi bi-funnel"></i> Filter</button>
        <CsvDownloadButton data={dataTable.table} filename='organizationList' delimiter="," className={orgHomeStyle["orgHomeExportButton"]}><i className="bi bi-file-earmark-arrow-down"></i> Export</CsvDownloadButton>
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
                                <input  className={orgHomeStyle["dataModuleFilterInput"]} type='text' value={dataTable.filterSearch} onChange={(e)=>{setDataTable({...dataTable, filterSearch: e.target.value})}}></input>
                            </div>
                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Date Range</label>
                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e)=>{  (e.target.value == "custom") ? setDataTable({...dataTable, customRange: true}) : setDataTable({...dataTable, customRange: false}) }}>
                                    <option value="anytime">Anytime</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            { (dataTable.customRange) &&
                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Date Range</label>
                                <input className={orgHomeStyle["dataModuleFilterInput"]} type='text' value={getFormatedRangeDate()} readOnly 
                                onClick={()=>{setDataTable({...dataTable, showRangeSelector: true})}}
                                onFocus={()=>{setDataTable({...dataTable, showRangeSelector: true})}}
                                ></input>
                            </div>}
                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>Type</label>
                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e)=>{  setDataTable({...dataTable, typeOption: e.target.value}) }}>
                                    <option value="all" selected={(dataTable.typeOption == "all") && "selected"}>All</option>
                                    <option value="Fundraising" selected={(dataTable.typeOption == "Fundraising") && "selected"}>Fundraising</option>
                                    <option value="Investing" selected={(dataTable.typeOption == "Investing") && "selected"}>Investing</option>
                                </select>
                            </div>
                            <div className={orgHomeStyle["dataModuleFilterInputGroup"]}>
                                <label className={orgHomeStyle["dataModuleFilterLabel"]}>KYB Status</label>
                                <select className={orgHomeStyle["dataModuleFilterInput"]} onChange={(e)=>{  setDataTable({...dataTable, kybStaus: e.target.value}) }}>
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
                               { (!dataTable.filterOn) && <button className={orgHomeStyle["dataModuleFilterResultButton"]} onClick={()=>{showFilteredResults()}}>Filter Results</button>}
                               { (dataTable.filterOn) && <button className={orgHomeStyle["dataModuleFilterResultButton"]} onClick={()=>{showFilteredResults()}}>RemoveFilter</button>}
                            </div>
                        </div>
                       {(dataTable.showRangeSelector) && <div className={orgHomeStyle["dataModuleDateRange"]}>  
                       <div 
                            className={orgHomeStyle["dataModuleDateRangeBackdrop"]} 
                            onClick={()=>{setDataTable({...dataTable, showRangeSelector: false})}}
                        ></div>
                        <div className={orgHomeStyle["rdrCalendarWrapper"]}>
                                <button  className={orgHomeStyle["rdrCalendarWrapperCloseBtn"]} onClick={()=>setDataTable({...dataTable, showRangeSelector: false})}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <DateRangePicker
                                editableDateInputs={true}
                                displayMode="dateRange"
                                onChange={item => {setDateRange([item.selection]); console.log(item.selection)}}
                                maxDate={new Date()}
                                rangeColors={["rgb(11,74,153)"]}
                                ranges={dateRange}
                                />
                            </div>
                        </div>}
                    </div>
                </div>}
                <div className={orgHomeStyle["dataModuleDataPrev"]} style={(dataTable.showFilter) ? {width: "calc(100% - 250px)"} : { width: "100%" }}>
                    <div className={orgHomeStyle["dataModuleStyleInner"]}>
                        {
                            (dataTable.totalRows == 0) && <div className={orgHomeStyle["dataModuleNoResults"]}>
                                No results found
                            </div>
                        }
                        <table className="table table-striped">
                        <thead className={orgHomeStyle["dataModuleThead"]}>
                            <tr className={orgHomeStyle["dataModuleTheadrow"]}>
                        
                                <th className={orgHomeStyle["dataModuleTh"]}  > 
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="_id" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Org ID</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="name" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Organization Name</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="companyNumber" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Company Number</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="kybStatus" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div data-sortDirection="none" className={orgHomeStyle["dataModuleThInner"]}><span>Kyb Status</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="organizationInterest" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Type</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="firstName" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Contact Point</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="creatorUsername" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Created By</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
                                <th className={orgHomeStyle["dataModuleTh"]}  >
                                    <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="createdAt" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
                                    <div className={orgHomeStyle["dataModuleThInner"]}><span>Created At</span>  <span><i class="bi bi-arrow-up-short"></i><i class="bi bi-arrow-down-short"></i></span>
                                    </div>
                                </th>
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
                                    
                                    <td className={orgHomeStyle["dataModuleTd"]}>{ e._id }</td>
                                        <td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/organization/view/" + e._id }>{ e.name }</Link></td>
                                        <td className={orgHomeStyle["dataModuleTd"]}>{ e.companyNumber }</td>
                                        <td className={orgHomeStyle["dataModuleTd"]}>{ e.kybStatus }</td>
                                        <td className={orgHomeStyle["dataModuleTd"]}>{ e.organizationInterest }</td>
                                        <td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/users/view/" + e.contactPoint }>{ e.firstName + " " + e.lastName }</Link></td>
                                        <td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/admin/view/" + e.createdBy}>{ e.creatorUsername }</Link></td>
                                        <td className={orgHomeStyle["dataModuleTd"]}>{ new Date(e.createdAt).toLocaleDateString() }</td>
                                        <td className={orgHomeStyle["dataModuleTd"]}>

                                            {
                                                (e.organizationInterest == "Fundraising") ? 
                                                    <Link to={"/dashboard/organization/view/" + e._id }><i class="bi bi-card-checklist"></i></Link>
                                                :
                                                    <Link to={"/dashboard/organization/view/" + e._id }><i class="bi bi-piggy-bank"></i></Link>
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
                            Showing page <b>{ dataTable.currentPage }</b> of <b>{ Math.ceil(dataTable.totalRows / dataTable.perPage)  }</b>
                        </div>
                        <div className={orgHomeStyle['dataModulePagination']}>
                        {
                            paginationNums().map(e=>{
                                return <a  className={orgHomeStyle[(dataTable.currentPage == e) ? "currentPage" : "navPage"]} href='javascript:void(0)' onClick={(e) => loadShowDataPage(e)} data-pageNum={e} >{e}</a>
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
                                ["","","","",""].map(e=>{
                                    return <th className={orgHomeStyle["dataModuleTh"]}  ><div className='placeholder col-4 data-table-placeholder'></div></th>
                                })
                            }
                            </tr>
                        </thead>
                        <tbody className={orgHomeStyle["dataModuleTbody"]}>
                            
                        {
                                ["","","","","","","","","","","",""].map(e => {
                                    return <tr className={orgHomeStyle["dataModuleTbodyrow"]}>
                                        {
                                            ["","","","",""].map(c=>{
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
                            Showing page <b>{ dataTable.currentPage }</b> of <b>{ Math.ceil(dataTable.totalRows / dataTable.perPage)  }</b>
                        </div>
                        <div className={orgHomeStyle['dataModulePagination']}>
                        {
                            paginationNums().map(e=>{
                                return <a  className={orgHomeStyle[(dataTable.currentPage == e) ? "currentPage" : "navPage"]} href='javascript:void(0)' onClick={(e) => loadShowDataPage(e)} data-pageNum={e} >{e}</a>
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
