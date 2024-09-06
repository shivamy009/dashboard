import { useState, useEffect } from 'react';

const TimeWindowSelector = ({ onTimeWindowChange }) => {
  const [selectedWindow, setSelectedWindow] = useState('1d');

  const handleTimeWindowChange = (event) => {
    const newWindow = event.target.value;
    setSelectedWindow(newWindow);
    onTimeWindowChange(newWindow);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 text-2xl font-semibold">Select Time Window:</label>
      <select value={selectedWindow} onChange={handleTimeWindowChange} className="p-2 border">
        <option value="1d">Last 1 Day</option>
        <option value="1w">Last 1 Week</option>
        <option value="1m">Last 1 Month</option>
      </select>
    </div>
  );
};

export default TimeWindowSelector;
