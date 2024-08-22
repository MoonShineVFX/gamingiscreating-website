import React, { useState, useEffect } from 'react';

const ToggleButton = ({ onImage, offImage, buttonText, isSelected, onClick }) => {
  const [isActive, setIsActive] = useState(isSelected); // 将 isSelected 作为初始状态
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsActive(isSelected); // 当父组件的选中状态变化时，更新按钮的状态
  }, [isSelected]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button
      className="relative overflow-hidden border-none rounded-md transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={isActive ? onImage : offImage} // 根据按钮的激活状态选择显示的图像
        alt="Button Image"
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300"></div>
      )}
      <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300">
        <span>{buttonText}</span>
      </div>
    </button>
  );
};

export default ToggleButton;
