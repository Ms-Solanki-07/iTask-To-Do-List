import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Login from './components/Login';
import YourTasks from './components/YourTasks';
import User from './components/User'
import { v4 as uuidv4 } from 'uuid';
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navbar/><Home/> </>
    },
    {
      path: "/login",
      element: <> <Navbar/><Login/> </>
    },
    {
      path: "/yourtasks",
      element: <> <Navbar/><YourTasks/> </>
    },
    {
      path: "/user/:username",
      element: <> <Navbar/><User/> </>
    } 
  ])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let idx = todos.findIndex((item) => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }
  

  return ( 
    <>  
       <RouterProvider router={router} />
      <div className="container overflow-auto bg-slate-200 md:w-1/2 w-[92%] mx-auto my-4 p-4 text-black h-[86vh] rounded-lg ">
        <h1 className='font-bold text-xl text-center mb-6'>iTask - Manage your todos at one place</h1>
        <div className='font-bold'>Add a todo</div>
        <div className="add-todo flex gap-5">
          <input onChange={handleChange} value={todo} type="text" className='p-2 py-1 bg-white outline-0 rounded-md w-[98%]' />
          <button onClick={handleAdd} disabled={todo.length <=3} className='p-3 py-1 bg-blue-500 rounded-md font-bold disabled:bg-blue-300 hover:bg-blue-400'>Save</button>
        </div>

        <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='my-4 mr-4'/><span className='text-gray-600'>Show Finished Todos</span>
        <div className='my-5 mb-1 font-bold '>Your todo</div>
        {todos.length == 0 && <div>You have not Todos to Display</div>}
        {todos.map((item) => {
          return (showFinished || !item.isCompleted) && (<div key={item.id} className="your-todos flex gap-5 items-center my-2  ">
            <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} id="" />
            <div className={`${item.isCompleted ? "line-through" : ""} w-[80%] overflow-auto`}>{item.todo}</div>
            <button onClick={(e) => { handleEdit(e, item.id) }} className='p-3 py-1 bg-blue-500 rounded-md font-bold hover:bg-blue-400'><FaEdit /></button>
            <button onClick={(e) => { handleDelete(e, item.id) }} className='p-3 py-1 bg-blue-500 rounded-md font-bold hover:bg-blue-400 '><FaDeleteLeft /></button>
          </div>
          )
        })}

      </div>
    </>
  )
}

export default App
