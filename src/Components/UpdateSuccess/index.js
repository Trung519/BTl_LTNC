import classNames from "classnames/bind";
import styles from "./UpdateSuccess.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

function UpdateSuccess() {
  return (
    <div className={cx("background")}>
      <span>
        <i class="fa-solid fa-check"></i>
      </span>
      <div>Cập nhật thành công</div>
    </div>
  );
}

export default memo(UpdateSuccess);
