import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectDate: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfDays, setNumberOfDays] = useState<number | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    if (date && endDate && date > endDate) {
      setEndDate(null);
      setNumberOfDays(null);
    } else {
      setStartDate(date);
      if (date && endDate) {
        const diffInTime = endDate.getTime() - date.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        setNumberOfDays(diffInDays);
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && startDate && date < startDate) {
      setStartDate(null);
      setNumberOfDays(null);
    } else {
      setEndDate(date);
      if (startDate && date) {
        const diffInTime = date.getTime() - startDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        setNumberOfDays(diffInDays);
      }
    }
  };

  return (
    <div className="flex items-start justify-start flex-col ml-4">
      <div className="mb-4">
        <h2 className="font-medium">Select Start Date:</h2>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <h2 className="font-medium">Select End Date:</h2>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          className="border border-gray-300 rounded-md w-full py-2 px-3 mb-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <span className="font-medium">Days allocated </span>:{" "}
        {numberOfDays !== null ? numberOfDays : "-"}
      </div>
    </div>
  );
};

export default ProjectDate;
