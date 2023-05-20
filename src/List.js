import React from "react";

export default function List({ data, handleEdit, handleDelete }) {
  console.log(data);
  return (
    <div className="list-group">
      {data.map((e) => {
        return (
          <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{e.name}</h5>
              <div>
                <button
                  onClick={() => handleEdit(e.id)}
                  className="btn btn-sm btn-link"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="btn btn-sm btn-link"
                >
                  Del
                </button>
              </div>
            </div>
            <p className="mb-1">{e.telp}</p>
          </div>
        );
      })}
    </div>
  );
}
