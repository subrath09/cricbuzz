import React, { useState,useEffect } from "react";

function Photos() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetchUserFromApi();
}, []);


  const fetchUserFromApi = async () => {
    try {
      const userApi = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
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
    <div className="flex justify-center flex-wrap m-20">
        <button className="bg-green-400  hover:bg-green-500 p-4 rounded-full shadow text-white font-bold" onClick={fetchUserFromApi}>
            Get Comments
        </button>
        <div className="flex flex-wrap ">
     {users.map((comment,index)=>{
            return <div className="bg-yellow-100 m-8 p-4  w-84 rounded-xl shadow-xl  ">
                <p>Post Id:-{comment.albumId}</p>
                 <p>ID:-{comment.id}</p>
                  <p>Name:-{comment.title}</p>
                   <a href={`${comment.url}`}>Email:-{comment.url}</a>
                   <a href={`${comment.thumbnailUrl}`}>Body:-{comment.thumbnailUrl}</a>
                   <hr/>
            </div>
            
        })}
        </div>






    </div>
  )
}

export default Photos