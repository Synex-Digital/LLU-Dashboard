import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            // Highlight specific dates
            if (
              (date.getDate() === 9 && date.getMonth() === 8) ||
              (date.getDate() === 12 && date.getMonth() === 8) ||
              (date.getDate() === 23 && date.getMonth() === 8)
            ) {
              return "highlight";
            }
          }
          return null;
        }}
      />
    </div>
  );
};

export default ReactCalendar;
