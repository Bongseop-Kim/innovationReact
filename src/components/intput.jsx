import { ReactComponent as Search } from "../assets/iconSearch.svg";

const Input = () => {
  return (
    <div className="relative">
      <input type="text" className="px-2 py-1 rounded-md" />
      <div className="absolute top-0 right-0">
        <Search className="pr-3" />
      </div>
    </div>
  );
};

export default Input;
