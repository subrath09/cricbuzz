import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);

function Userdata() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"),limit(8));
      const snap = await getDocs(q);
      

      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">User Data</h2>

      <table className="w-full bg-white shadow-xl rounded-xl">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="p-3">First</th>
            <th className="p-3">Middle</th>
            <th className="p-3">Last</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Email</th>
            <th className="p-3">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="text-center border-b">
              <td className="p-3">{u.firstname}</td>
              <td className="p-3">{u.middlename}</td>
              <td className="p-3">{u.lastname}</td>
              <td className="p-3">{u.contact}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Userdata;
