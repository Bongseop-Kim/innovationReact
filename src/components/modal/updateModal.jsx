import Button from "../button";
import axios from "axios";
import ListInputForm from "./listInputForm";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, checkedList, setCheckedList }) => {
  if (!showUpdateModal) {
    return null;
  }

  const changeValueAtIndex = (i, key, value) => {
    setCheckedList((prevList) => {
      return prevList.map((item, index) => {
        if (index === i) {
          return { ...item, [key]: value };
        }
        return item;
      });
    });
  };

  const submit = () => {
    console.log(checkedList);
    axios
      .post("http://localhost:8080/list/update", checkedList)
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
            ${showUpdateModal ? "translate-y-10" : "translate-y-full"}
            ${showUpdateModal ? "opacity-100" : "opacity-0"}
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
              <ListInputForm changeValueAtIndex={changeValueAtIndex} list={checkedList} />
            </div>

            {/* bottom */}
            <div className="flex gap-4 justify-center">
              <Button title="회원 정보 수정하기" onClick={submit} />
              <Button title="닫기" onClick={() => setShowUpdateModal(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
