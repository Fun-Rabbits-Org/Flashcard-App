import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const newTheme = (theme) =>
  createTheme({
    ...theme,
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: "#fff",
            borderRadius: 20,
            borderWidth: 0,
            borderColor: "#2d3956",
            border: "0px solid",
            backgroundColor: "#2d3956",
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: "#fff",
            borderRadius: 20,
            borderWidth: 0,
            borderColor: "#2d3956",
            border: "0px solid",
            backgroundColor: "#2d3956",
          },
        },
      },
    },
  });

const ProfilePage = () => {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">
        <h1>Cyrus Burns</h1>
      </div>
      <div className="calendar-wrapper">
        <div className="streak-text">
          <h3>Recently Earned</h3>
        </div>
        <ThemeProvider theme={newTheme}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ color: "white" }}
          >
            <DateCalendar />
          </LocalizationProvider>
        </ThemeProvider>
        <div className="streak-text">
          <h3>Current Streak</h3>
          <p>2-day</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
