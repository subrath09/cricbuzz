import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

function FormApi() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("form"));
    if (savedForm) setFormData(savedForm);
  }, []);

  const handleChanges = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    localStorage.setItem("form", JSON.stringify(newData));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user,{displayName: formData.name})


      await sendEmailVerification(userCredential.user);

      alert("Verification link sent. Please verify your email.");

      navigate("/form"); 
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAlreadyUser = () => {
    navigate("/form");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-24 font-medium text-center">

        <div className="p-4">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChanges}
            className="p-3 rounded-xl border-2"
            disabled={loading}
          />
        </div>

        <div className="p-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChanges}
            className="p-3 rounded-xl border-2"
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-xl text-white
              ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600"}
            `}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </div>
            ) : (
              "Submit"
            )}
          </button>

          <button
            onClick={handleAlreadyUser}
            className="text-green-800 font-bold shadow-xl px-4 rounded-full bg-[#a6decf]"
          >
            Already a user !
          </button>
        </div>

      </div>
    </div>
  );
}

export default FormApi;
