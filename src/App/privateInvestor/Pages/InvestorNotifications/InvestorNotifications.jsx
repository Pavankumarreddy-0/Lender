import React from 'react';
import NotiStyles from './InvestorNotifications.module.css';

function InvestorNotifications() {
  return (
    <div className={[NotiStyles['main-div']]}>
      <div>
        <h3 className={NotiStyles['top-head']}>Notifications</h3>
      </div>
      <div className={NotiStyles['arrow-class']}>

      </div>
    </div>
  )
}

export default InvestorNotifications
