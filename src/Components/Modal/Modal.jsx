import "./Modal.css";

import { useState } from "react";

export default function Modal({ closeModal, onSubmit, defaultValue }) {
  const [equimentState, setequimentState] = useState(
    defaultValue || {
      name: "",
      type: "",
      id: "",
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

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(equimentState);

    closeModal();
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
        <form>
          <div>
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={equimentState.name}
            />
          </div>

          <div>
            <label htmlFor="type">Loại</label>
            <input
              type="text"
              name="type"
              onChange={handleChange}
              value={equimentState.type}
            />
          </div>

          {/* <div>
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id"
                                onChange={handleChange} value={equimentState.id}
                            />
                        </div> */}

          <div>
            <label htmlFor="room">Phòng</label>
            <input
              type="text"
              name="room"
              onChange={handleChange}
              value={equimentState.room}
            />
          </div>

          <div>
            <label htmlFor="description">Mô tả</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={equimentState.description}
            />
          </div>

          <div id="status-box">
            <label htmlFor="status">Trạng thái</label>
            <select
              name="status"
              onChange={handleChange}
              value={equimentState.status}
            >
              <option value="Sẵn có">Sẵn có</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
              <option value="Đang sử dụng">Đang sử dụng</option>
            </select>
          </div>
          <div id="btn-container">
            <button id="submit-btn" type="submit" onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
