import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleSession = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSchedule = () => {
    if (selectedDate) {
      alert(`Session scheduled for: ${selectedDate.toLocaleString()}`);
    } else {
      alert("Please select a date and time.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 p-1 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Schedule a Session
        </h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSchedule}
          className="bg-orange-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-orange-600 transition"
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleSession;
