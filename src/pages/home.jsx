import { useEffect, useState } from "react";
import Button from "../components/button";
import Layout from "../layouts/layout";
import Input from "../components/intput";
import axios from "axios";
import CreateModal from "../components/modal/createModal";
import UpdateModal from "../components/modal/updateModal";

const Home = () => {
  const SORT_OPTIONS = [
    { name: "이름순", state: "name" },
    { name: "번호순", state: "number" },
  ];
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [option, setOption] = useState(SORT_OPTIONS[0]);

  const [checkedList, setCheckedList] = useState([]);

  const [sample, setSample] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/list").then((res) => setSample(res.data.data));
  }, []);

  const handleOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find((option) => option.state === selectedOptionState);

    if (selectedOption) {
      setOption(selectedOption);
      setIsOpenOption(false);
    }
  };

  const handleOptionClick = () => {
    setIsOpenOption(!isOpenOption);
  };

  const handleItemClick = (item) => {
    // 체크되어 있지 않은 경우, 해당 아이템을 리스트에 추가
    if (!checkedList.includes(item)) {
      setCheckedList([...checkedList, item]);
    } else {
      // 이미 체크된 경우, 해당 아이템을 리스트에서 제외
      setCheckedList(checkedList.filter((checkedItem) => checkedItem !== item));
    }
  };

  const handleDelete = () => {
    const ids = checkedList.map((item) => item.id);
    axios
      .delete("http://localhost:8080/list", { data: ids })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => console.log(error.reponse));
  };

  return (
    <Layout>
      <CreateModal showModal={showModal} setShowModal={setShowModal} />
      <UpdateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
      />
      <div className="bg-sky-200 p-8 w-full h-full">
        {/* 네비 */}
        <div className="flex items-center justify-between">
          <div>회원 정보</div>
          <div className="flex gap-2">
            <Button
              title={"추가 +"}
              onClick={() => {
                setShowModal(true);
              }}
            />
            <Button
              title={"선택수정"}
              onClick={() => {
                setShowUpdateModal(true);
              }}
            />
            <Button title={"선택삭제"} onClick={handleDelete} />
            <div className="relative">
              <Button title={`${option.name} ▼`} onClick={() => handleOptionClick()} />
              {isOpenOption && (
                <div className="absolute bg-white w-full rounded-md">
                  {SORT_OPTIONS.map((option) => (
                    <option
                      key={option.state}
                      value={option.state}
                      className="hover:cursor-pointer px-2 py-1 hover:bg-neutral-200"
                      onClick={handleOptionChange}
                    >
                      {option.name}
                    </option>
                  ))}
                </div>
              )}
            </div>
            <Input />
          </div>
        </div>

        {/* main */}
        <div className="flex flex-col items-end gap-4">
          <div className="mx-auto w-full">
            {/* 제목 */}
            <div className="grid grid-cols-8 mt-10 ">
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center rounded-tl-md">
                No
              </div>
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center">이름</div>
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center">번호</div>
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center">아이디</div>
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-3 font-bold flex justify-center">총입금액</div>
              <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center rounded-tr-md">
                현재스코어
              </div>
            </div>

            {/* List */}
            {sample.map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-8 cursor-pointer  ${
                  checkedList.includes(item) ? "bg-neutral-300" : "bg-white"
                }`}
                onClick={() => {
                  handleItemClick(item);
                }}
              >
                <div className="border-t px-4 py-4 col-span-1 flex justify-center">{item.id}</div>
                <div className="border-t px-4 py-4 col-span-1 flex justify-center">{item.name}</div>
                <div className="border-t px-4 py-4 col-span-1 flex justify-center">{item.number}</div>
                <div className="border-t px-4 py-4 col-span-1 flex justify-center">{item.user_id}</div>
                <div className="border-t px-4 py-4 col-span-3 flex justify-center">{item.income}</div>
                <div className="border-t px-4 py-4 col-span-1 flex justify-center">{item.score}</div>
              </div>
            ))}

            {/* 바텀 */}
            <div className="flex justify-end bg-white px-4 py-3 gap-4">
              <div className="flex justify-between w-40">
                <div>총입금액</div>
                <div className="font-bold">0원</div>
              </div>
              <div className="flex justify-between w-40">
                <div>수입금</div>
                <div className="font-bold">0원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
