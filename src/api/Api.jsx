import React, { useState } from "react";

function Api() {
  const [todos, setTodos] = useState([]);

  const fetchTodoFromApi = async () => {
    try {
      const todoApi = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "GET",
        }
      );
      const todoResponse = await todoApi.json()
      console.log(todoResponse)
      setTodos(todoResponse)
      console.log(todoApi)
    } catch (error) {
      alert(error + "");
    }
  };

  return <div >
    <button className="bg-blue-500 p-4 h-12 rounded-full mx-auto mt-2 flex item-center justify-center " onClick={fetchTodoFromApi}>
        
       GET TODOS

    </button>
       <div className="flex flex-wrap m-20 ">
     {todos.map((todo,index)=>{
            return <div className="bg-sky-200 m-8  p-4  w-48 ">
                <p>{todo.user}</p>
                 <p>{todo.id}</p>
                  <p>{todo.title}</p>
                   <p>{todo.completed}</p>
                   <hr/>
            </div>
            
        })}
        </div>
  </div>;
}

export default Api;
