import React, { useState } from 'react'
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
      spacing: [0,0,0,0],
      padding: [0,0,0,0],
      margin: [0,0,0,0],
      style:{
        margin: "0px",
        padding: "0px",
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
              [0, 'rgba(11,74,153,0.2)'],
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
        align: 'center',
        style: {
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "17px",
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
              enabled: false
          },
          showInLegend: true,
         colors: ['#0b4a9950','#0b4a9970','#0b4a9990']
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
        fontSize: "20px",
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

  const [dashboardState, setDashboardState] = useState({
    incomeInvestment: options,
    headerCards,
    investorByCategory,
    investorRegistrations
  })



  return (
    <div className={dashHomeStyle['dashHomeModule']}>
      <div className={dashHomeStyle['dashHomeInvestmentChart']}>
        <HighchartsReact
          highcharts={Highcharts}
          options={dashboardState.incomeInvestment }
        />
        <div className={dashHomeStyle['dashHomeInvestAmountGreen']}>3000 GBP <i className="bi bi-arrow-up-circle"></i></div>
        <button className={dashHomeStyle['refreshDataButton']}><i class="bi bi-arrow-clockwise"></i> Refresh</button>
      </div>
      <div className={dashHomeStyle['dashHomeInvestmentCards']}>
        {
          dashboardState.headerCards.map((e)=>{
            return <div className={dashHomeStyle['dashHomeInvestmentCardSingle']}>
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
    </div>
  )
}
