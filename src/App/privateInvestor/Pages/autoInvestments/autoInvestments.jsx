import { useState } from 'react';
import AutoInvestmentsStyles from './autoInvestments.module.css'
import AutoInvestmentsConfigure from './autoInvestmentsConfigure';
import AutoInvestmentsCreation from './autoInvestmentCreation';

function AutoInvestments() {
    const [showInvestmentCreation, setShowInvestmetCreation] = useState(false)
    const handleAutoInvestment = (info) => {
        if (info === "configare") {
            setShowInvestmetCreation(true)
        } else {
            setShowInvestmetCreation(false)
        }
    }
    return (
        <div className={AutoInvestmentsStyles['auto_investments']}>
            {
                showInvestmentCreation ? <AutoInvestmentsCreation handleAutoInvestment={handleAutoInvestment} /> : <AutoInvestmentsConfigure handleAutoInvestment={handleAutoInvestment} />
            }
        </div>
    )
}

export default AutoInvestments;