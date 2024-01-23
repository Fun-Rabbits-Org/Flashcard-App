import React, { useState } from "react";
// import Calendar from "react-calendar";

const ProfilePage = () => {
  const [value, onChange] = useState(new Date());

  const getTileClassName = ({ date }) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isWeekend ? "weekend" : "weekday";
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">firstname_lastname</div>
      <div className="calendar-wrapper">
        {/* <Calendar
          onChange={onChange}
          value={value}
          className="calendar-widget"
          tileClassName={getTileClassName}
          calendarType="US"
        /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
