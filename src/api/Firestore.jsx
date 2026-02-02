import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

const db = getFirestore(app);

function Firestore() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    contact: "",
    address: "",
    email: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !values.firstname ||
      !values.lastname ||
      !values.contact ||
      !values.email
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "users"), {
        ...values,
        createdAt: serverTimestamp(),
      });

      alert("Form submitted successfully ");

      setValues({
        firstname: "",
        middlename: "",
        lastname: "",
        contact: "",
        address: "",
        email: "",
      });
    } catch {
      setError("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div
        
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Contact Information</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <input
            name="firstname"
            value={values.firstname}
            onChange={handleChanges}
            placeholder="First name"
            className="p-3 border rounded"
          />
          <input
            name="middlename"
            value={values.middlename}
            onChange={handleChanges}
            placeholder="Middle name"
            className="p-3 border rounded"
          />
          <input
            name="lastname"
            value={values.lastname}
            onChange={handleChanges}
            placeholder="Last name"
            className="p-3 border rounded"
          />
          <input
            name="contact"
            value={values.contact}
            onChange={handleChanges}
            placeholder="Contact"
            className="p-3 border rounded"
          />
          <input
            name="email"
            value={values.email}
            onChange={handleChanges}
            placeholder="Email"
            className="p-3 border rounded"
          />
          <input
            name="address"
            value={values.address}
            onChange={handleChanges}
            placeholder="Address"
            className="p-3 border rounded"
          />
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex justify-center gap-6 mt-8">
          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-600 text-white px-10 py-3 rounded-xl flex items-center justify-center gap-2
               disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>

          {/* GET USER DATA BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/users")}
            className="bg-gray-700 text-white px-10 py-3 rounded-xl flex items-center justify-center gap-2
               disabled:opacity-60"
          >
            Get User Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default Firestore;
