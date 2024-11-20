// Button.tsx
import { ButtonProps } from "../../interfaces/ui";



const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const classes =
    `relative text-xl font-bold border-0 text-white cursor-pointer transition duration-300 group`;

  return (
    <button onClick={onClick} className={classes} {...props}>
      <div className="px-3 py-2 text-purple-500 hover:bg-black/20 hover:text-purple-700 text-4xl">
        {children}
      </div>
    </button>
  );
};

export { Button };