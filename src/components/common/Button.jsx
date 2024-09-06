const Button = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg bg-Primary p-3 font-semibold text-white`}
    >
      {title}
    </button>
  );
};

export default Button;
