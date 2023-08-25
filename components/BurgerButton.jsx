import React, { useEffect, useState } from 'react';

const BurgerButton = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (onToggle) onToggle(newState)
  }

  useEffect (() => {
    if(!onToggle)
    setIsOpen(false)
  })

  

  return (
    <div 
      onClick={handleToggle} 
      className='w-8 h-6 flex flex-col justify-between cursor-pointer gap-1'
    >
      <div 
        className={`rounded w-full h-1.5 bg-gray-700 transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-x-0.5 translate-y-2' : ''}`} 
      />
      <div 
        className={`rounded w-full h-1.5 transition-colors duration-300 ${isOpen ? 'bg-transparent' : 'bg-gray-700'}`} 
      />
      <div 
        className={`rounded w-full h-1.5 bg-gray-700 transform transition-transform duration-300 ${isOpen ? 'rotate-[-45deg] translate-x-0.5 -translate-y-2.5' : ''}`} 
      />
    </div>
  );
};

export default BurgerButton;