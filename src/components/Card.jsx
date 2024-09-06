import React from 'react';

const Card = ({ title, value }) => {
    // console.log(title,value)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
