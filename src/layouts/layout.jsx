import NavBar from "../components/nav/navBar";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-14">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
