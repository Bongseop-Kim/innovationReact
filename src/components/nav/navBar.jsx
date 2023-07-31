import NavList from "./navList";

const NavBar = () => {
  return (
    <div className="p-8 flex flex-col">
      <NavList title={"회원관리"} contents={["정보", "회원관리", "추천인정보", "SNS보내기"]} />
      <NavList title={"회원관리"} contents={["정보", "회원관리", "추천인정보", "SNS보내기"]} />
      <NavList title={"회원관리"} contents={["정보", "회원관리", "추천인정보", "SNS보내기"]} />
    </div>
  );
};

export default NavBar;
