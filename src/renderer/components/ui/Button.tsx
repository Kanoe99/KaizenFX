// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const classes =
    'relative text-xl backdrop-blur-2xl font-bold border-0 text-white cursor-pointer hover:text-white hover:bg-transparent transition duration-300 group hover:border-0 hover:outline-none';

  return (
    <button onClick={onClick} className={classes} {...props}>
      <div className="px-3 py-2 shadow-md group-hover:shadow-xl transition duration-300">
        {children}
      </div>
    </button>
  );
};

export { Button };