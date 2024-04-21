import "./Modal.css";

import { useState } from "react";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";

export default function Modal({
  closeModal,
  onSubmit,
  defaultValue,
  setAlertAddSuccess,
}) {
  const [equimentState, setequimentState] = useState(
    defaultValue || {
      name: "",
      type: "",
      // id: "",
      room: "",
      description: "",
      status: "Sẵn có",
    }
  );

  function handleChange(e) {
    setequimentState({
      ...equimentState,
      [e.target.name]: e.target.value,
    });
  }
  const [displayError, setDipslayError] = useState(false);
  function isInValid() {
    let values = Object.values(equimentState);
    return values.includes("");
  }

  function handleSubmit(e) {
    if (isInValid()) {
      setDipslayError(true);
      setTimeout(() => {
        setDipslayError(false);
      }, 3000);
    } else {
      e.preventDefault();

      onSubmit(equimentState);

      closeModal();
      setAlertAddSuccess(true);
      setTimeout(() => {
        setAlertAddSuccess(false);
      }, 3000);
    }
  }

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      <div className="modal-content">
        {displayError && (
          <span className="alert-error">Vui lòng không để trống thông tin</span>
        )}
        <div className="modalE-header">
          <h1>Thêm thông tin thiết bị</h1>
        </div>
        <form className="form-data">
          <div className="input-wrap">
            <input
              required
              type="text"
              name="name"
              onChange={handleChange}
              value={equimentState.name}
              // placeholder="Tên"
              autoComplete="off"
            />
            <label htmlFor="name">Tên*</label>
          </div>

          <div className="input-wrap">
            <input
              required
              type="text"
              name="type"
              onChange={handleChange}
              value={equimentState.type}
              // placeholder="Loại"
              autoComplete="off"
            />
            <label htmlFor="type">Loại*</label>
          </div>

          {/* <div>
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id"
                                onChange={handleChange} value={equimentState.id}
                            />
                        </div> */}

          <div className="input-wrap">
            <input
              required
              type="text"
              name="room"
              onChange={handleChange}
              value={equimentState.room}
              // placeholder="Phòng"
              autoComplete="off"
            />
            <label htmlFor="room">Phòng*</label>
          </div>

          <div id="description" className="input-wrap">
            <input
              required
              type="text"
              name="description"
              onChange={handleChange}
              value={equimentState.description}
              // placeholder="Mô tả"
              autoComplete="off"
            />
            <label htmlFor="description">Mô tả</label>
          </div>

          <div id="status-box">
            {/* <label htmlFor="status">Trạng thái</label> */}
            <select
              name="status"
              onChange={handleChange}
              value={equimentState.status}
              disabled
            >
              <option value="Sẵn có">Sẵn có</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
              <option value="Đang sử dụng">Đang sử dụng</option>
            </select>
          </div>
          <div id="btn-container">
            <div className="submit-btn" onClick={closeModal}>
              Hủy
            </div>
            <div className="submit-btn" type="submit" onClick={handleSubmit}>
              Lưu
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
