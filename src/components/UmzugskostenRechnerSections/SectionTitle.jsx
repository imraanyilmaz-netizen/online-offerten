import React from 'react';

const SectionTitle = ({ icon, title }) => {
  return (
    <div className="flex items-center mb-6">
      {icon && React.cloneElement(icon, { className: "w-8 h-8 text-green-600 mr-3" })}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default SectionTitle;