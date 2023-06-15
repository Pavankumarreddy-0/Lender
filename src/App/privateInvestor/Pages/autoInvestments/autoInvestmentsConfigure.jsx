import React from 'react'
import AutoInvestmentsStyles from './autoInvestments.module.css'

function AutoInvestmentsConfigure({handleAutoInvestment}) {
    return (
        <div className={AutoInvestmentsStyles['auto_investments_configure']}>
            <h3>Auto-Investment</h3>

            <div className={AutoInvestmentsStyles['configure']}>
                <div className={AutoInvestmentsStyles['configure_inner_div']}>
                    <p>For now you don't have any auto-investment configurations. Click button below to start configuring auto-investment.</p>
                    <button onClick={()=>handleAutoInvestment("configare")}>CONFIGURE</button>
                </div>
            </div>
        </div>
    )
}

export default AutoInvestmentsConfigure;