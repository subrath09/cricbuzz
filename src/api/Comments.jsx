import React, { useState } from "react";

function Comments() {

   const[comments,setComments]=useState([]);

   const fetchCommentfromApi = async ()=>{
   try {
      const commentApi = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "GET",
        }
      );
      const commentResponse = await commentApi.json()
      setComments(commentResponse)
      console.log(commentResponse)
      console.log(commentApi)
    } catch (error) {
      alert(error + "");
    }
  };

  return (
    <div className="flex justify-center flex-wrap m-20">
        <button className="bg-green-400  hover:bg-green-500 p-4 rounded-full shadow text-white font-bold" onClick={fetchCommentfromApi}>
            Get Comments
        </button>
        <div className="flex flex-wrap ">
     {comments.map((comment,index)=>{
            return <div className="bg-yellow-100 m-8 p-4  w-64 rounded-xl shadow-xl  ">
                <p>Post Id:-{comment.postId}</p>
                 <p>ID:-{comment.id}</p>
                  <p>Name:-{comment.name}</p>
                   <p>Email:-{comment.email}</p>
                   <p>Body:-{comment.body}</p>
                   <hr/>
            </div>
            
        })}
        </div>






    </div>
  )
}

export default Comments;