import React, { useState, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dashHomeStyle from './dashboardHome.module.css'

export default function InvestorDashboardHome() {

  

  const options = {
    chart: {
        type: 'areaspline',
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0],
        spacing:[0,0,0,0],
        height: "300px",
        style: {
          maxHeight: "500px",
          minHeight: "300px"
        },
        zoomBySingleTouch: true,
        resetZoomButton: {
          theme: {
              fill: '#0b4a99',
              stroke: '#0b4a99',
              style:{
                display: "none"
              },
              r: 0,
              states: {
                  hover: {
                      fill: '#41739D',
                      style: {
                          color: 'white'
                      }
                  }
              }
          }
      },
        zoomType: 'x',
        backgroundColor: {
          linearGradient: [0, 0, 0, 500],
          stops: [
              [0, 'rgb(255, 255, 255)'],
              [1, 'rgb(255, 255, 255)']
          ]
      },
    },
    title: {
        text: 'Investment Performance',
        align: 'left',
        x: 20,
        y: 30,
        style: {
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "13px",
          margin: "10px",
          padding: "10px"
      }
    },
    subtitle: {
        text: '',
        align: 'left',
        style: {
          display: 'none'
      }
    },
    xAxis: {
      type: '',
      style:{
        display: "none"
      }
    },
    yAxis: {
      title: {
          text: '$',
      },
      style: {
        display: 'none'
      },
      type: 'logarithmic',
      tickWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      gridLineColor: 'rgba(0,0,0,0)'
    },
    tooltip: {
        shared: true,
        style: {
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "12px",
      }
    },
    legend:{
      enabled: false,
      style:{
        display: 'none'
      }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
          color: 'rgba(11,74,153,1)'
        },
        areaspline: {
          fillOpacity: 0.5,
          fillColor:{
            linearGradient: [0, 0, 0, 280],
            stops: [
              [0, 'rgba(11,74,153,0.3)'],
              [1, 'rgba(11,74,153,0.1)'],
              // [1, 'rgba(0,0,0,0)'],
              // [2, 'rgba(0,0,0,0)'],
              // [3, 'rgba(0,0,0,0)']
            ]
          }
        },
        
          
      
    },
    series: [ {
        name: 'Investment Performance',
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 2
        },
        style:{
          margin: [0, 0, 0, 0],
          padding: [0, 0, 0, 0],
          spacing:[10,0,0,0]
        },
        data:
            [
                ["06-03-2023",19534],
                ["07-03-2023",22534],
                ["08-03-2023",20534],
                ["09-03-2023",21534],
                ["10-03-2023",23534],
                ["11-03-2023",24534],
                ["12-03-2023",25534],
                ["13-03-2023",26534],
                ["14-03-2023",25534],
                ["15-03-2023",27534],
                ["16-03-2023",24534],
                ["17-03-2023",23534],
                ["18-03-2023",26534],
                ["19-03-2023",27534],
                ["20-03-2023",28534],
                ["21-03-2023",31534],
                ["22-03-2023",33534],
            ]
    }]
  }

  const headerCards =[
   { title: "Wallet Total Balance", value: "30,884,370.00 GBP", icon: "bi bi-piggy-bank"},
   { title: "Wallet Free Balance", value: "4,370.00 GBP", icon: "bi bi-piggy-bank"},
   { title: "Sum of debt investments", value: "0.00 GBP", icon: "bi bi-piggy-bank"},
   { title: "Number of debt investments", value: "2", icon: "bi bi-piggy-bank"},
   { title: "Sum of loan", value: "0.0 GBP", icon: "bi bi-piggy-bank"},
   { title: "Expected Interest", value: "0.0 GBP", icon: "bi bi-piggy-bank"},
   { title: "Expected Returns", value: "4,370.00 GPB ", icon: "bi bi-piggy-bank"},
   { title: "Number of donations", value: "5 ", icon: "bi bi-piggy-bank"},
  ]

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
      soldShare:30,
      agreement: [
        {
          docName: "Primary Agreement",
          docId: "12345"
        }
      ],
      investmentDate: new Date(),
      investedAmount: 5000
    },
    {
      id: "78901",
      dealImg: "https://picsum.photos/500?random=2",
      dealCat: "EQUITY",
      dealStatus: "Processing",
      dealName: "Yachtico",
      dealType: "Funding",
      dealAddr: "67, Union Group, London, UK",
      dealSharesCount: 300,
      pricePerShare: 10,
      soldShare:70,
      agreement: [        
      ],
      investmentDate: new Date(),
      investedAmount: 5000
    },
  ];

  const chartComponent = useRef(null);

  const [dashboardState, setDashboardState] = useState({
    incomeInvestment: options,
    headerCards,
    deals
  })

  const resetZoom = () => {
    if (chartComponent.current) {
      chartComponent.current.chart.xAxis[0].setExtremes();
      chartComponent.current.chart.yAxis[0].setExtremes();
    }
  };



  return (
    <div className={dashHomeStyle['dashHomeModule']}>
      <div className={dashHomeStyle['dashHomeInvestmentChart']}>
        <HighchartsReact
          ref={chartComponent}
          highcharts={Highcharts}
          options={dashboardState.incomeInvestment }
        />
        <div className={dashHomeStyle['dashHomeInvestAmountGreen']}>3000 GBP <i className="bi bi-arrow-up-circle"></i></div>
        <button onClick={()=>resetZoom()} className={dashHomeStyle['refreshDataButton']}><i className="bi bi-arrow-clockwise"></i> Reset</button>
      </div>
      <div className={dashHomeStyle['dashHomeInvestmentCards']}>
        {
          dashboardState.headerCards.map((e)=>{
            return <div key={e.title} className={dashHomeStyle['dashHomeInvestmentCardSingle']}>
              <div className={dashHomeStyle['dashHomeCardIcon']}>
                  <i className={e.icon}></i>
              </div>
              <div className={dashHomeStyle['dashHomeCardMeta']}>
                <div className={dashHomeStyle['dashHomeCardTitle']}>{e.title}</div>
                <div className={dashHomeStyle['dashHomeCardValue']}>{e.value}</div>
              </div>
              </div>
          })
        }
      </div>
      <div className={dashHomeStyle['dashHomeDoubleChartSection']}>
        {
          (dashboardState.deals.length > 0) ?
            dashboardState.deals.map((e)=>{
              return <div className={dashHomeStyle['invest_deal']}>
                <div className={dashHomeStyle['invest_prev']}>
                  <img className={dashHomeStyle['invest_img']} src={e.dealImg}/>
                  <div className={dashHomeStyle['invest_deal_labels']}>
                  <span className={dashHomeStyle['invest_deal_label']}>{e.dealStatus}</span>
                  <span className={dashHomeStyle['invest_deal_label']}>{e.dealCat}</span>
                  </div>
                </div>
                <div className={dashHomeStyle['invest_meta']}>
                  <div className={dashHomeStyle['invest_meta_Inner']}>
                    <div className={dashHomeStyle['invest_meta_flex_wrap']}>
                      <div className={dashHomeStyle['invest_meta_left_grp']}>
                    <div className={dashHomeStyle['invest_meta_header_top']}>
                      <h3 className={dashHomeStyle['invest_meta_deal_name_title']}>{ e.dealName }</h3>
                      <span className={dashHomeStyle['invest_meta_deal_type']}>{ e.dealType }</span>
                    </div>
                    {
                      ( "dealAddr" in e ) && <p className={dashHomeStyle['invest_meta_deal_addr']}>{ e.dealAddr }</p>
                    }
                    </div>
                    <div className={dashHomeStyle['invest_meta_right_grp']}>
                    <div className={dashHomeStyle['invest_meta_progress']}>
                      <span className={dashHomeStyle['invest_meta_deal_percentage']}>{ ((e.soldShare / e.dealSharesCount) * 100).toFixed(2) }%</span>
                      <span className={dashHomeStyle['invest_meta_deal_title']}>{ e.soldShare * e.pricePerShare } GBP / { e.dealSharesCount * e.pricePerShare } GBP</span>
                    </div>
                    <div className={dashHomeStyle['goal_progress']}>
                      <div className={dashHomeStyle['goal_prgrs']} style={{width: ((e.soldShare / e.dealSharesCount) * 100) + "%"}}></div>
                    </div>
                    </div>
                    </div>
                    <div className={dashHomeStyle['invest_meta_items']}>
                      <div className={dashHomeStyle['invest_meta_item']}>
                        <div className={ dashHomeStyle['invest_meta_key'] }>
                          Number of Shares :
                        </div>
                        <div className={ dashHomeStyle['invest_meta_value'] }>
                          {e.dealSharesCount}
                        </div>
                      </div>
                      <div className={dashHomeStyle['invest_meta_item']}>
                        <div className={ dashHomeStyle['invest_meta_key'] }>
                          Price Per Share:
                        </div>
                        <div className={ dashHomeStyle['invest_meta_value'] }>
                          {e.pricePerShare} GBP
                        </div>
                      </div>
                    </div>
                    {(e.agreement.length > 0) && <div className={dashHomeStyle['invest_docs_list']}>
                      {e.agreement.map((doc)=>{
                        return  <div className={dashHomeStyle['invest_doc']}>
                            <div className={dashHomeStyle['invest_doc_name']}>
                              <i className="bi bi-file-earmark-text"></i>
                              <span className={dashHomeStyle['invest_doc_title']}>{doc.docName}</span>
                            </div>
                            <div className={dashHomeStyle['invest_doc_download']}>
                              <a href='javascript:void(0)' className={dashHomeStyle["invest_doc_link"]}><i className="bi bi-download"></i></a>
                            </div>
                          </div>
                      })}
                      </div>
                    }
                    {
                      ("investmentDate" in e) && <div className={dashHomeStyle['invest_meta-footer']}>
                        <h4 className={dashHomeStyle['investDate']}>Invested on { e.investmentDate.toDateString() }</h4>
                        <h4 className={dashHomeStyle['investAmount']}>{ e.investedAmount } GBP</h4>
                      </div>
                    }
                  </div>
                </div>
              </div>
            })
          :
          <>"No deals found"</>
        }
      </div>
    </div>
  )
}
