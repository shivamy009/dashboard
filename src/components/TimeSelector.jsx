import React from 'react';

const TimeSelector = ({ onTimeWindowChange }) => {
  const handleChange = (event) => {
    onTimeWindowChange(event.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <label className=" text-center text-4xl  font-bold">Select Time Window:</label>
      <select
        className="border border-gray-300 rounded-md p-2"
        onChange={handleChange}
      >
        <option value="1d">Last 1 Day</option>
        <option value="1w">Last 1 Week</option>
        <option value="1m">Last 1 Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="1y">Last 1 Year</option>
      </select>
    </div>
  );
};

export default TimeSelector;
