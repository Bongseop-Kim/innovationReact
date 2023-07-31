const NavList = ({ title, contents }) => {
  return (
    <div className="mb-4 w-28">
      <div className="font-bold mb-2">{title}</div>
      <div className="ml-6 gap-4 flex flex-col gap-1">
        {contents.map((content, i) => (
          <div key={i}>{content}</div>
        ))}
      </div>
    </div>
  );
};

export default NavList;
