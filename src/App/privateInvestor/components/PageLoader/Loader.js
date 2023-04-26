import React from 'react'
import LoaderStyles from './Loader.module.css'

function Loader() {
return (
    <>
        <div className={LoaderStyles['LoaderMainWrapper']}>
        <img src="/assets/img/PilogCloudRedBlue.gif" alt="Loader GIF"/>
        </div>
    </>
)
}

export default Loader