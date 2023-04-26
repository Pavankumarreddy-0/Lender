import React from 'react';
import NoAccessStyles from './NoAccess.module.css'

function NoAccess() {
return (
    <div className={NoAccessStyles['noAccessMainWrapper']}>
        <div className={NoAccessStyles['noAccessInnerWrapper']}>
        <i class="bi bi-exclamation-circle">Error</i>
        <p>Sorry you dont have Access to this page please update your role or Contact Administration</p>
        </div>
    </div>
)
}

export default NoAccess
