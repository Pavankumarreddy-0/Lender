import React from 'react'
import IndecatedInterestStyles from './indecatedInterest.module.css'
import { Link } from 'react-router-dom'

function IndecatedInterest() {
    return (
        <div className={IndecatedInterestStyles['indecated_interest']}>
            <h3>Indecated Interest</h3>

            <div className={IndecatedInterestStyles['no_interests_yet']}>
                <h3>No Interests Yet</h3>
                <Link to="#">VIEW COMMING SOON OPPORTUNITIES</Link>
            </div>
        </div>
    )
}

export default IndecatedInterest;