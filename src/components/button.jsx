const Button = ({ onClick, title, outline }) => {
  return (
    <button
      className={`px-4 py-1 bg-white hover:bg-neutral-700 hover:text-white rounded-md ${outline && "border"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
