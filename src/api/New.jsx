import React, { useEffect, useState } from "react";
import app from "../firebase";
import {  getAuth,  signInWithEmailAndPassword,  sendPasswordResetEmail, updateProfile,} from "firebase/auth";

function New() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState("");

  const auth = getAuth(app);

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("form"));
    if (savedForm) setFormData(savedForm);
  }, []);

  const handleChanges = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
    localStorage.setItem("form", JSON.stringify(newData));
  };

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (!userCredential.user.emailVerified) {
        setAlert("Please verify your email before login.");
        return;
      }




      setAlert("Login Successful!");
    } catch (error) {
      setAlert(error.message);
    }
  };

  const handleForgot = async () => {
    if (!formData.email) {
      setAlert("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setAlert("Password reset email sent");
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-24 font-medium text-center">

        <div className="p-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChanges}
            className="p-3 rounded-xl border-2"
          />
        </div>

        <div className="p-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChanges}
            className="p-3 rounded-xl border-2"
          />
        </div>

{alert && <div className="text-red-600 font-bold mb-4">{alert}</div>}


<div className="flex justify-around gap-20">
        <button
          onClick={handleForgot}
          className="text-blue-700 font-medium mb-4 mt-4"
        >
          Forgot Password?
        </button>

        

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-8 py-3 rounded-full"
        >
          Sign In
        </button>
   </div>
      </div>
    </div>
  );
}

export default New;
