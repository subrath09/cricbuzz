import React, { useState,useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetchUserFromApi();
}, []);


  const fetchUserFromApi = async () => {
    try {
      const userApi = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
        }
      );
      const userResponse = await userApi.json();
      console.log(userResponse);
      setUsers(userResponse);
      console.log(userApi);
    } catch (error) {
      alert(error + "");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 p-4 h-12 rounded-full text-white font-bold mx-auto mt-4  flex item-center justify-center "
        onClick={fetchUserFromApi}
      >
        GET USERS
      </button>
      <div className="flex flex-wrap m-20 ">
        {users.map((user, index) => {
          return (
            <div className="bg-sky-200 m-8  p-4  w-94 leading-8 rounded-xl shadow-xl ">
              <p>
                <b>ID:-</b>
                {user.id}
              </p>
              <p>
                <b>NAME:-</b>
                {user.name}
              </p>
              <p>
                <b>USERNAME:-</b>
                {user.username}
              </p>
              <p>
                <b>EMAIL:-</b>
                {user.email}
              </p>
              <hr />

              <b>ADDRESS:-</b>
              <p>{user.address.street}</p>
              <p>{user.address.suite}</p>
              <p>{user.address.city}</p>
              <p>{user.address.zipcode}</p>
              <hr />

              <b>GEO:-</b>

              <a
                // href={
                //   "https://www.google.com/maps?q" +
                //   user.address.geo.lat +
                //   "," +
                //   user.address.geo.lng
                // }
                href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                target="_blank"
                className="bg-blue-400 p-1 rounded inline-block mt-2"
              >
                {user.address.geo.lat}, {user.address.geo.lng}
              </a>

              <hr />
              <p>
                <b>Phone:-</b>
                {user.phone}
              </p>
              <p>
                <b>Website:-</b>
                {user.website}
              </p>
              <b>Company:-</b>
              <p>
                <b>Name:- </b>
                {user.company.name}
              </p>
              <p>
                <b>Catch Phrase:- </b>
                {user.company.catchPhrase}
              </p>
              <p>
                <b>BS:- </b>
                {user.company.bs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
