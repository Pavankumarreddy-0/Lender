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
        spacing:[10,0,0,0],
        backgroundColor: {
          linearGradient: [0, 0, 0, 500],
          stops: [
              [0, 'rgb(234, 234, 238)'],
              [1, 'rgb(255, 255, 255)']
          ]
      },
    },
    title: {
        text: 'Investment Performance',
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
      plotBands: [{ // Highlight the two last years
        from: 2019,
        to: 2020,
        color: 'rgba(68, 170, 213, .2)'
      }],
      title:{
        text: "abc",
        
      },
      tickWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      
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
          radius: 1
        },
        data:
            [
                22534,
                23599,
                24533,
                25195,
                25896,
                27635,
                29173,
                32646,
                35686,
                37709,
                39143,
                36829,
                35031,
                36202,
                35140,
                33718,
                37773,
                42556,
                43820,
                46445,
                50048
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
            sliced: true,
            selected: true
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
      margin: [0, 0, 30, 0],
      padding: [0, 0, 0, 0],
      spacing:[10,0,10,0],
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
    
    title:{
      text: "abc",
      plotBands: [{ // Highlight the two last years
        from: 2019,
        to: 2020,
        color: 'rgba(68, 170, 213, .2)'
      }]
    },
    tickWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    
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
              22534,
              23599,
              24533,
              25195,
              25896,
              27635,
              29173,
              32646,
              35686,
              37709,
              39143,
              36829,
              35031,
              36202,
              35140,
              33718,
              37773,
              42556,
              43820,
              46445,
              50048
          ]
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
