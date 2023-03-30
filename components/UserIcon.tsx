import React from 'react';

interface UserIconProps {
  image: string;
  size?: number;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ image, size = 32, className }) => {
  return (
    <img
      src={image}
      alt="User profile"
      className={`rounded-full ${className}`}
      width={size}
      height={size}
    />
  );
};

export default UserIcon;
