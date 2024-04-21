import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { getData } from "../../../../services/firebase";
import styles from "./InputBorrower.module.scss";

const cx = classNames.bind(styles);

function InputBorrower({ inputSearch, setInputSearch }) {
  const [dataEmp, setDataEmp] = useState([]);
  useEffect(() => {
    getData().then((post) => {
      setDataEmp(post["Employee"]);
    });
  }, []);
  // const [inputSearch, setInputSearch] = useState("");
  const [displayList, setDisplayList] = useState(false);
  let dataFilter = [];
  if (inputSearch) {
    dataFilter = dataEmp.filter((item) => {
      return (
        item.FirstName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        item.LastName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        item.ID.toLowerCase().includes(inputSearch.toLowerCase())
      );
    });
  }

  return (
    <div className={cx("input-borrower")}>
      <input
        className={cx("input-user")}
        placeholder="Nhập ID hoặc tên người mượn"
        value={inputSearch}
        autoFocus
        onChange={(e) => {
          setInputSearch(e.target.value);
          if (e.target.value !== "") setDisplayList(true);
        }}
      ></input>
      {displayList && (
        <ul className={cx("ul-suggest")}>
          {dataFilter.map((item) => {
            return (
              <li
                onClick={() => {
                  setInputSearch(item.ID);
                  setDisplayList(false);
                }}
              >
                <div>{`${item.LastName} ${item.FirstName}`}</div>
                <span>-{item.ID}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default InputBorrower;
