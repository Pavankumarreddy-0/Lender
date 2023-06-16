import React from "react";
import NotiStyles from "./InvestorNotifications.module.css";

function InvestorNotifications() {
  const Data = [
    {
      type: "notifications",
      id: "0afe3e44-6252-4326-a8d5-051f44d7239c",
      attributes: {
        id: "0afe3e44-6252-4326-a8d5-051f44d7239c",
        subject: "Investment is settled",
        content:
          "Congratulations! Yachtico reached the goal. You will be notified once any dividends will be paid",
        read_at: "31 May 2023",
        is_read: true,
        created_at: "26 May 2023 7:28 AM",
        updated_at: "31 May 2023 7:16 AM",
      },
    },
    {
      type: "notifications",
      id: "0afe3e44-6252-4326-a8d5-051f44d7239c",
      attributes: {
        id: "0afe3e44-6252-4326-a8d5-051f44d7239c",
        subject: "Payment is under process",
        content:
          "Congratulations! Yachtico reached the goal. You will be notified once any dividends will be paid",
        read_at: "31 May 2023",
        is_read: true,
        created_at: "26 May 2023 7:28 AM",
        updated_at: "31 May 2023 7:16 AM",
      },
    },
  ];

  const [value, setValue] = React.useState("rs");
  const [period,setPeriod] = React.useState('dp');
  const [searchValue,setSearchValue] = React.useState('Search Here')

  const handleChange = (val) => {
    console.log("selected", val);
    setValue(val);
  };
 const handleChangePeriod =(val)=>{
    setPeriod(val)
 };
 const handleChangeSearch =(val)=>{
    setSearchValue(val)
 }
  return (
    <div className={[NotiStyles["main-div"]]}>
      <div>
        <h3 className={NotiStyles["top-head"]}>Notifications</h3>
      </div>
      <div className={NotiStyles['filter-div']}>
        <div className={NotiStyles["dropdown-class"]}>
          <label for="example-1" className={NotiStyles["label"]}>
            sort by read status
          </label>
          <select
            id="example-1"
            size="large"
            className={NotiStyles["drop-value"]}
            value={value}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          >
            <option value="rs">Read Status</option>
            <option value="r">Read</option>
            <option value="ur">Unread</option>
          </select>
        </div>
        <div className={NotiStyles["dropdown-class"]}>
          <label for="example-1" className={NotiStyles["label"]}>
            sort by period
          </label>
          <select
            id="example-1"
            size="large"
            className={NotiStyles["drop-value"]}
            value={period}
            onChange={(e) => {
              handleChangePeriod(e.target.value);
            }}
          >
            <option value="dp">Datetime period</option>
            <option value="one">1 day</option>
            <option value="seven">7 days</option>
            <option value="th">30 days</option>

          </select>
        </div>
        <div className={NotiStyles["dropdown-class-search"]}>
          <label for="example-1" className={NotiStyles["label"]}>
            search notification
          </label>
          <input
            id="example-1"
            size="large"
            className={NotiStyles["drop-value"]}
            value={searchValue}
            onChange={(e) => {
              handleChangeSearch(e.target.value);
            }}
          >
    
          </input>
        </div>
      </div>
      <div className={NotiStyles["arrow-class"]}>
        <div className={NotiStyles["button-div"]}>
          <button className={NotiStyles["btn"]}>
            <i class="fa fa-arrow-up"></i>
          </button>
          <button className={NotiStyles["btn"]}>
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
        </div>
        <div className={NotiStyles["mark-class"]}>
          <button className={NotiStyles["btn"]}>Mark all as read</button>
        </div>
      </div>
      <div>
        <table>
          <tbody>
            {Data.map((item, index) => {
              return (
                <tr key={index} className={NotiStyles["table-row"]}>
                  <td className={NotiStyles["table-data"]}>
                    <h4>{item.attributes.subject}</h4>
                    <p>{item.attributes.content}</p>
                  </td>
                  <td className={NotiStyles["table-data"]}>
                    {item.attributes.created_at}
                  </td>
                  <td>
                    <i class="fa fa-check"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvestorNotifications;
