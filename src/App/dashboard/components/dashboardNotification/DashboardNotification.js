import React, {useState} from 'react'
import dashNotiStyle from './dashNotification.module.css'

export default function DashboardNotification(props) {

    const [notiState, setNotiState] = useState({
        message: props.notiText,
        notiType: props.notiType,
        notiIcon: props.notiIcon,
        isClosed: false
    })

    const hideNotification = () => {
        setNotiState({...notiState, isClosed: true})
    }

    const getNotificationClass = (type) => {
        switch(type){
            case "Error":
                return "notification_message_error";
            break;
            case "Warning":
                return "notification_message_warn";
            break;
            case "Info":
                return "notification_message_info";
            break;
        }
    }

  return (
    ( !notiState.isClosed ) &&  <div className={dashNotiStyle[getNotificationClass(notiState.notiType)]}>
      <div className={dashNotiStyle["notificationIcon"]}>
        <i className={notiState.notiIcon}></i>
      </div>
      <div className={dashNotiStyle["notificationText"]}>
        {notiState.message}
      </div>
      <div className={dashNotiStyle["notificationCloseBtn"]}>
        <a href='javascript:void(0);' onClick={()=>hideNotification()}><i class="bi bi-x-circle-fill"></i></a>
      </div>
    </div>
  )
}
