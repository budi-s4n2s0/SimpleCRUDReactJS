import "./App.css";
import List from "./List";

import { useState } from "react";
import { uid } from "uid";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      telp: "08815646413",
    },
    {
      id: 2,
      name: "Alex Pick",
      telp: "08815646413",
    },
    {
      id: 3,
      name: "John Doe2",
      telp: "08815646410",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  function resetFormData() {
    setFormData({
      name: "",
      telp: "",
    });
  }

  function resetIsUpdate() {
    setIsUpdate({ id: null, status: false });
  }

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.name === "" || formData.telp === "") {
      alert("Inputan tidak boleh kosong");
      return;
    }

    //menambah data
    let data = [...contacts]; // copi data contacts

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });
    } else {
      data.push({ id: uid(), name: formData.name, telp: formData.telp });
    }

    setContacts(data);

    resetFormData(); //reset formData
    resetIsUpdate(); //reset penanda update
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({ name: foundData.name, telp: foundData.telp });
    setIsUpdate({ id: id, status: true });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    setContacts(filterData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.telp}
            name="telp"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        data={contacts}
      />
    </div>
  );
}

export default App;
