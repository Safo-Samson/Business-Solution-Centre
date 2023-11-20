import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ProjectDateProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const ProjectDate: React.FC<ProjectDateProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [numberOfDays, setNumberOfDays] = useState<number | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      setNumberOfDays(diffInDays);
    } else {
      setNumberOfDays(null);
    }
  }, [startDate, endDate]);

  return (
    <div className="flex items-start justify-start flex-col ml-4">
      <div className="mb-4">
        <h2 className="font-medium">Select Start Date:</h2>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => onStartDateChange(date)}
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
          onChange={(date: Date | null) => onEndDateChange(date)}
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
