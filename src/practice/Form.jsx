import React, { useState } from "react";

function Form() {
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    contact: "",
    address: "",
    email: "",
  });

  const MIN_LENGTH = 20;

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

 
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (values.firstname === "") {
      setError("First Name required");
      return;
    }
    if (values.middlename === "") {
      setError("Middle Name required");
      return;
    }
    if (values.lastname === "") {
      setError("Last Name required");
      return;
    }
    if (values.contact.length !== 10) {
      setError("Contact number must be 10 digits");
      return;
    }
    if (values.address.length < MIN_LENGTH) {
      setError("Address must be at least 20 characters");
      return;
    }

    
    if (!validateEmail(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    
  };

  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div className="justify-center m-24 mx-64 items-center text-center font-medium">
        <div className="p-4">
          <label className="p-6">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="firstname"
            onChange={handleChanges}
          />
        </div>

        <div className="p-4">
          <label className="p-6">Middle Name</label>
          <input
            type="text"
            placeholder="Enter Middle Name"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="middlename"
            onChange={handleChanges}
          />
        </div>

        <div className="p-4">
          <label className="p-6">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="lastname"
            onChange={handleChanges}
          />
        </div>

        <div className="p-4">
          <label className="p-6">Contact no</label>
          <input
            type="text"
            placeholder="Contact no"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="contact"
            onChange={handleChanges}
          />
        </div>

        <div className="p-4">
          <label className="px-6">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="address"
            onChange={handleChanges}
          />
        </div>

        <div className="p-4">
          <label className="px-6">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            className="p-3 rounded-xl bg-white shadow border-2"
            name="email"
            onChange={handleChanges}
          />
        </div>

        <span className="text-red-500 font-bold">{error}</span>

        <div>
          <button
            onClick={handleSubmit}
            className="text-white bg-green-600 border-2 py-3 px-8 border-green-600 rounded-xl font-medium mx-24 my-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
