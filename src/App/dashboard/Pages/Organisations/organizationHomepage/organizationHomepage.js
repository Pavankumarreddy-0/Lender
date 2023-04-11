import React, { useEffect, useState } from 'react'
import orgHomeStyle from './organizationHomepage.module.css'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash'
import axios from 'axios';

export default function OrganizationHomepage() {

    const [dataTable, setDataTable] = useState({
        table: [],
        perPage: 10,
        totalRows: 0,
        currentPage: 1
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
        setDataTable({...dataTable, table: []});
        loadTableData(nextPage);
    }

    const loadTableData = async (pageNum, matches) => {
        await axios.post('/api/organizations/', { pageNum , matches , perPage: dataTable.perPage},{
            headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
        }).then(response => {
  
            const { result, currentPage } = response.data;
            setDataTable({...dataTable, table: result[0].paginatedResults, totalRows: result[0].totalCount[0].count, currentPage: currentPage})
  
        }).catch(error => {
            console.error(error);
      })
    }

    useEffect(()=>{
        loadTableData(1,{});
    },[])
      

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
        <button className={orgHomeStyle["orgHomeFilterButton"]}><i className="bi bi-funnel"></i> Filter</button>
        <button className={orgHomeStyle["orgHomeExportButton"]}><i className="bi bi-file-earmark-arrow-down"></i> Export</button>
      </div>
      <div className={orgHomeStyle["orgHomeOrgTable"]}>
      <div className={orgHomeStyle["dataModuleStyle"]}>
         
         {(dataTable.table.length > 0) ? 
            <div className={orgHomeStyle["dataModuleOuterCont"]}>
                <div className={orgHomeStyle["dataModuleStyleInner"]}>
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
                                <div onClick={(e)=>{ sortTableDirection(e) }} data-sortColumn="creatorUsername" data-sortDirection="none" className={orgHomeStyle["dataModuleThOverlay"]}></div>
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
                                    <td className={orgHomeStyle["dataModuleTd"]}>{ e.organizationInterest }</td>
                                    <td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/users/view/" + e.contactPoint }>{ e.firstName + " " + e.lastName }</Link></td>
                                    <td className={orgHomeStyle["dataModuleTd"]}><Link to={"/dashboard/admin/view/" + e.createdBy}>{ e.creatorUsername }</Link></td>
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
            :
            <div className={orgHomeStyle["dataModuleOuterCont"]}>
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
            }
        </div>
      </div>
    </div>
  )
}
