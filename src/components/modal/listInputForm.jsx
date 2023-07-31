const ListInputForm = ({ changeValueAtIndex, list }) => {
  return list.map((item, i) => (
    <div key={item.i} className="grid grid-cols-7">
      <input
        className="border-t px-4 py-4 col-span-1 flex justify-center"
        type="string"
        onChange={(e) => {
          changeValueAtIndex(i, "name", e.target.value);
        }}
        value={list[i].name}
      />
      <input
        className="border-t px-4 py-4 col-span-1 flex justify-center"
        type="number"
        onChange={(e) => {
          changeValueAtIndex(i, "number", e.target.value);
        }}
        value={list[i].number}
      />
      <input
        className="border-t px-4 py-4 col-span-1 flex justify-center"
        type="string"
        onChange={(e) => {
          changeValueAtIndex(i, "user_id", e.target.value);
        }}
        value={list[i].user_id}
      />
      <input
        className="border-t px-4 py-4 col-span-3 flex justify-center"
        type="number"
        onChange={(e) => {
          changeValueAtIndex(i, "income", e.target.value);
        }}
        value={list[i].income}
      />
      <input
        className="border-t px-4 py-4 col-span-1 flex justify-center"
        type="number"
        onChange={(e) => {
          changeValueAtIndex(i, "score", e.target.value);
        }}
        value={list[i].score}
      />
    </div>
  ));
};

export default ListInputForm;
