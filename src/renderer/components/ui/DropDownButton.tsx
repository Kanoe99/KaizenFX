// Button.tsx
import { ButtonProps } from "../../interfaces/ui";



const DropDownButton: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const classes =
    `relative text-xl font-bold w-full border-0 text-white cursor-pointer hover:text-white hover:bg-transparent transition duration-300 group hover:border-0 hover:outline-none`;

  return (
    <button onClick={onClick} className={classes} {...props}>
      <div className={`px-3 w-full bg-purple-500 text-left hover:bg-purple-700 py-2 group-hover:shadow-xl transition duration-300 ${props.className}`}>
        {children}
      </div>
    </button>
  );
};

export { DropDownButton };