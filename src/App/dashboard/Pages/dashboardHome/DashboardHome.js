import React, { useState, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dashHomeStyle from './dashboardHome.module.css'

export default function DashboardHome() {

  

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
   { title: "Total Invested", value: "30,884,370.00 GPB", icon: "bi bi-piggy-bank"},
   { title: "Today Invested", value: "4,370.00 GPB", icon: "bi bi-piggy-bank"},
   { title: "Total Investment Numbers", value: "141", icon: "bi bi-piggy-bank"},
   { title: "Pending investments number", value: "2", icon: "bi bi-piggy-bank"},
   { title: "Total repaid", value: "0.0 GBP", icon: "bi bi-piggy-bank"},
   { title: "Total donations amount", value: "0.0 GBP", icon: "bi bi-piggy-bank"},
   { title: "Total dividends paid", value: "4,370.00 GPB ", icon: "bi bi-piggy-bank"},
   { title: "Total number of shares", value: "4,370,99 ", icon: "bi bi-piggy-bank"},
  ]

  const investorByCategory = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        // margin: [10, 10, 10, 10],
        // padding: [30, 30, 30, 30],
        // spacing: [20,20,20,20],
    },
    title: {
        text: 'Investors by Category',
        align: 'left',
        x: 20,
        y: 20,
        style: {
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "13px",
          margin: "10px",
          padding: "10px"
      }
    },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  
  // legend:{
  //   enabled: false,
  //   style:{
  //     display: 'none'
  //   }
  // },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          
    
          dataLabels: {
            enabled: true,
            style: {
                fontWeight: '600',
                color: 'black',
                fontFamily: "Montserrat, sans-serif"
            }
        },
          showInLegend: true,
         colors: ['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
      }
  },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Retail',
            y: 70.67,
        }, {
            name: 'Hight Net Worth Individuals',
            y: 14.77
        },  {
            name: 'Self certified sophesticated Investors',
            y: 4.86
        }, {
            name: 'Individual Non Sophesticated Investors',
            y: 2.63
        }, {
            name: 'Institutional Non Sophesticated Investor',
            y: 1.53
        }]
    }]
}

const investorRegistrations = {
  chart: {
      type: 'areaspline',
      margin: [0, 0, 60, 0],
      padding: [0, 0, 0, 0],
      spacing:[10,0,10,0],
      style:{
        borderRadius: "5px"
      }
  },
  title: {
      text: 'Investor Registrations',
      align: 'left',
      x: 20,
      y: 20,
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
      // type: 'datetime',
      type: 'category',
  },
  yAxis: {
    title: {
        text: '$',
    },
    tickWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: 'rgba(0,0,0,0.1)'
  },
  tooltip: {
      shared: false,
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
          linearGradient: [0, 0, 20, 280],
          stops: [
            [0, 'rgba(11,74,153,0.2)'],
            [1, 'rgba(0,0,0,0)']
          ]
        }
      },
      
        
    
  },
  series: [ {
      name: 'Investment Performance',
      marker: {
        enabled: true,
        symbol: "circle",
        radius: 1
      },
      data:
      [
        ["22/22/22", 29.9],
        ["70/22/22", 71.5],
        ["80/22/22", 106.4],
        ["90/22/22", 129.2]
      ],
      pointStart: Date.UTC(2010, 0, 1),
      pointInterval: 3600 * 1000 // one hour
  }]
}

const customersByStatus = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      
      height: "300px",
      style: {
        maxHeight: "500px",
        minHeight: "300px",
        borderRadius: "5px",     
      },
      backgroundColor: {
        linearGradient: [0, 0, 0, 500],
        stops: [
            [0, 'rgba(255, 255, 255, 0)'],
            [1, 'rgba(255, 255, 255, 0)']
        ]
    },
  },
  title: {
      text: 'Customers By Status',
      align: 'left',
      x: 20,
      y: 20,
      style: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: "13px",
        margin: "10px",
        padding: "10px"
    }
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          dataLabels: {
              enabled: true,
              style: {
                  fontWeight: '600',
                  color: 'black',
                  fontFamily: "Montserrat, sans-serif"
              }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
      }
  },
  series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
          ['Invitation Pending', 13.86],
          ['KYC Approved', 73.86],
          ['Completed Registration', 11.97],
         
      ]
  }]
}

const offeringByCaptialType = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      
      height: "300px",
      style: {
        maxHeight: "500px",
        minHeight: "300px",
        borderRadius: "5px",     
      },
      backgroundColor: {
        linearGradient: [0, 0, 0, 500],
        stops: [
            [0, 'rgba(255, 255, 255, 0)'],
            [1, 'rgba(255, 255, 255, 0)']
        ]
    },
  },
  title: {
      text: 'Offerings by Capital Type',
      align: 'left',
      x: 20,
      y: 20,
      style: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: "13px",
        margin: "10px",
        padding: "10px"
    }
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  legend:{
    enabled: true
  },
  plotOptions: {
      pie: {
          dataLabels: {
              enabled: true,
              style: {
                  fontWeight: '600',
                  color: 'black',
                  fontFamily: "Montserrat, sans-serif"
              }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
          colors:['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
      }
  },
  series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
          ['Equity', 33.86],
          ['Debt', 43.86],
          ['Donation', 41.97],
         
      ]
  }]
}

const customersByRole = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: {
        linearGradient: [0, 0, 0, 500],
        stops: [
            [0, 'rgba(255, 255, 255, 0)'],
            [1, 'rgba(255, 255, 255, 0)']
        ]
    },
    
    height: "300px",
    style: {
      maxHeight: "500px",
      minHeight: "300px",
      borderRadius: "5px",     
    },
      // margin: [10, 10, 10, 10],
      // padding: [30, 30, 30, 30],
      // spacing: [20,20,20,20],
  },
  title: {
      text: 'Customers By Role',
      align: 'left',
      x: 20,
      y: 20,
      style: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: "13px",
        margin: "10px",
        padding: "10px"
    }
  },
tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
accessibility: {
    point: {
        valueSuffix: '%'
    }
},

// legend:{
//   enabled: false,
//   style:{
//     display: 'none'
//   }
// },
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        
  
        dataLabels: {
          enabled: true,
          style: {
              fontWeight: '600',
              color: 'black',
              fontFamily: "Montserrat, sans-serif"
          }
      },
        showInLegend: true,
       colors: ['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
    }
},
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Corporate Fundraiser',
          y: 70.67,
      }, {
          name: 'Individuals Investor',
          y: 14.77
      },  {
          name: 'Corporate Investors',
          y: 4.86
      }]
  }]
}

const offeringByStatusPerformance =  {
  chart: {
      type: 'areaspline',
      margin: [0, 0, 60, 0],
      padding: [0, 0, 0, 0],
      spacing:[10,0,10,0],
      style:{
        borderRadius: "5px"
      }
  },
  title: {
      text: 'Offerings By Status Performance',
      align: 'left',
      x: 20,
      y: 20,
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
      // type: 'datetime',
      type: 'category',
  },
  yAxis: {
    title: {
        text: '$',
    },
    tickWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: 'rgba(0,0,0,0.1)'
  },
  tooltip: {
      shared: false,
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
          linearGradient: [0, 0, 20, 280],
          stops: [
            [0, 'rgba(11,74,153,0.2)'],
            [1, 'rgba(0,0,0,0)']
          ]
        }
      },
      
        
    
  },
  series: [ {
      name: 'Investment Performance',
      marker: {
        enabled: true,
        symbol: "circle",
        radius: 1
      },
      data:
      [
        ["22/01/23", 49.9],
        ["23/01/23", 31.5],
        ["24/01/23", 56.4],
        ["25/01/23", 79.2],
        ["26/01/23", 69.2],
        ["27/01/23", 59.2],
        ["28/01/23", 89.2],
        ["29/01/23", 95.2],
        ["30/01/23", 99.2]
      ],
      pointStart: Date.UTC(2010, 0, 1),
      pointInterval: 3600 * 1000 // one hour
  }]
}

const offeringsByStatus = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: {
        linearGradient: [0, 0, 0, 500],
        stops: [
            [0, 'rgba(255, 255, 255, 0)'],
            [1, 'rgba(255, 255, 255, 0)']
        ]
    },
    
    height: "400px",
    style: {
      maxHeight: "500px",
      minHeight: "300px",
      borderRadius: "5px",     
    },
      // margin: [10, 10, 10, 10],
      // padding: [30, 30, 30, 30],
      // spacing: [20,20,20,20],
  },
  title: {
      text: 'Offerings by status',
      align: 'left',
      x: 20,
      y: 20,
      style: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: "13px",
        margin: "10px",
        padding: "10px"
    }
  },
tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
accessibility: {
    point: {
        valueSuffix: '%'
    }
},

// legend:{
//   enabled: false,
//   style:{
//     display: 'none'
//   }
// },
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        
  
        dataLabels: {
          enabled: true,
          style: {
              fontWeight: '600',
              color: 'black',
              fontFamily: "Montserrat, sans-serif"
          }
      },
        showInLegend: true,
       colors: ['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
    }
},
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [
        {
          name: 'Repayment',
          y: 70.67,
      }, {
          name: 'Finished',
          y: 14.77
      },  {
          name: 'Fundings',
          y: 4.86
      },
        {
          name: 'Published',
          y: 70.67,
      }, {
          name: 'Approved',
          y: 14.77
      },  {
          name: 'Draft',
          y: 4.86
      },  {
        name: 'Submitted',
        y: 4.86
    }
    ]
  }]
}

const averageInvestment = {
  chart: {
      type: 'column',
      height: "400px",
    style: {
      maxHeight: "500px",
      minHeight: "300px",
      borderRadius: "5px",     
    },
  },
  title: {
      text: 'Average Investment',
      align: 'left',
      x: 20,
      y: 20,
      style: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: "13px",
        margin: "10px",
        padding: "10px"
    },
    
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: ''
      }
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      },
      colors: ['#002d76', '#335bac', '#6a8cd9', '#a4c0fc', '#f5f5f5', '#ffbcaf', '#f4777f', '#cf3759', '#93003a']
  },
  series: [{
      name: 'Average Investment',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
          194.1, 95.6, 54.4]

  }]
}

const numbersOfInvestments =  {
  chart: {
      type: 'areaspline',
      margin: [0, 0, 60, 0],
      padding: [0, 0, 0, 0],
      spacing:[10,0,10,0],
      style:{
        borderRadius: "5px"
      }
  },
  title: {
      text: 'Numbers of Investments',
      align: 'left',
      x: 20,
      y: 20,
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
      // type: 'datetime',
      type: 'category',
  },
  yAxis: {
    title: {
        text: '$',
    },
    tickWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: 'rgba(0,0,0,0.1)',
    // type: 'logarithmic',
  },
  tooltip: {
      shared: false,
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
          linearGradient: [0, 0, 20, 280],
          stops: [
            [0, 'rgba(11,74,153,0.2)'],
            [1, 'rgba(0,0,0,0)']
          ]
        }
      },
      
        
    
  },
  series: [ {
      name: 'Investment Performance',
      marker: {
        enabled: true,
        symbol: "circle",
        radius: 1
      },
      data:
      [
        ["22/01/23", 5],
        ["23/01/23", 7],
        ["24/01/23", 6],
        ["25/01/23", 7],
        ["26/01/23", 6],
        ["27/01/23", 8],
        ["28/01/23", 7],
        ["29/01/23", 8],
        ["30/01/23", 7]
      ],
      pointStart: Date.UTC(2010, 0, 1),
      pointInterval: 3600 * 1000 // one hour
  }]
}

  const chartComponent = useRef(null);

  const [dashboardState, setDashboardState] = useState({
    incomeInvestment: options,
    headerCards,
    investorByCategory,
    investorRegistrations,
    customersByStatus,
    customersByRole,
    offeringByCaptialType,
    offeringByStatusPerformance,
    offeringsByStatus,
    averageInvestment,
    numbersOfInvestments
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

        <div className={dashHomeStyle['dashHomeInvestorByCategory']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.investorByCategory }
          />
        </div>

        <div className={dashHomeStyle['dashHomeInvestorRegistration']}>
        <HighchartsReact
          highcharts={Highcharts}
          options={dashboardState.investorRegistrations }
        />
        </div>

      </div>
      <div className={dashHomeStyle['dashHomeCustomerStats']}>

        <div className={dashHomeStyle['dashHomeCustomersByStatus']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.customersByStatus }
          />
        </div>
        <div className={dashHomeStyle['dashHomeCustomersByRole']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.customersByRole }
          />
        </div>
        <div className={dashHomeStyle['dashHomeOfferingByCapitalType']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.offeringByCaptialType }
          />
        </div>       

      </div>
      <div className={dashHomeStyle['dashHomeDoubleOfferingChartSection']}>

        <div className={dashHomeStyle['dashHomeOfferingByStatusPerformance']}>
        <HighchartsReact
          highcharts={Highcharts}
          options={dashboardState.offeringByStatusPerformance }
        />
        </div>

        <div className={dashHomeStyle['dashHomOfferingByStaus']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.offeringsByStatus }
          />
        </div>

       

      </div>
      <div className={dashHomeStyle['dashHomeDoubleInvestmentSection']}>
        <div className={dashHomeStyle['dashHomNumInvestment']}>
          <HighchartsReact
            highcharts={Highcharts}
            options={dashboardState.averageInvestment }
          />
        </div>
        <div className={dashHomeStyle['dashHomeAvgInvestment']}>
        <HighchartsReact
          highcharts={Highcharts}
          options={dashboardState.numbersOfInvestments }
        />
        </div>
      </div>
    </div>
  )
}
