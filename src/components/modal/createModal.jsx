import { useState } from "react";
import Button from "../button";
import axios from "axios";
import ListInputForm from "./listInputForm";

const CreateModal = ({ showModal, setShowModal }) => {
  const [list, setList] = useState([{ name: "", number: 0, user_id: "", income: 0, score: 0 }]);

  if (!showModal) {
    return null;
  }

  const changeValueAtIndex = (i, key, value) => {
    setList((prevList) => {
      return prevList.map((item, index) => {
        if (index === i) {
          return { ...item, [key]: value };
        }
        return item;
      });
    });
  };

  const submit = () => {
    axios
      .post("http://13.125.31.169:8080/list", list)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.responseMessage);
      });
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 z-50 bg-neutral-800/70">
      <div className="relative w-4/5 my-6 mx-auto h-full h-auto ">
        {/*content*/}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-10" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="translate h-full rounded-lg flex flex-col w-full">
            {/*body*/}
            <div className="overflow-y-auto h-4/5">
              <div className="grid grid-cols-7 ">
                <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center rounded-tl-md">
                  이름
                </div>
                <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center">번호</div>
                <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center">아이디</div>
                <div className="border-t px-4 py-3 bg-neutral-100 col-span-3 font-bold flex justify-center">
                  총입금액
                </div>
                <div className="border-t px-4 py-3 bg-neutral-100 col-span-1 font-bold flex justify-center rounded-tr-md">
                  현재스코어
                </div>
              </div>
              <ListInputForm changeValueAtIndex={changeValueAtIndex} list={list} />
              <div className="w-full bg-white py-6 flex justify-center rounded-b-md">
                <Button
                  title="항목 추가 +"
                  outline
                  onClick={() => setList([...list, { name: "", number: 0, user_id: "", income: 0, score: 0 }])}
                />
              </div>
            </div>

            {/* bottom */}
            <div className="flex gap-4 justify-center">
              <Button title="회원 정보에 추가하기" onClick={submit} />
              <Button title="닫기" onClick={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
