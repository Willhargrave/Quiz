import React from "react"
import "../styles/Home.css"
import { db } from "../config";
import { uid } from 'uid';
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";
const Home = () => {
const [todo, setTodo] = useState("");

const handleTodoChange=(e)=>{
    setTodo(e.target.value)
}
    const writeToDatabase = () => {
        const uuid = uid()
        set(ref(db, `/${uuid}`), {
          todo,
          uuid,
        });
        setTodo("");
    };
return(
    <div className="main">
       <div className="home-title">
        <h2>Welcome to quiz maker!</h2>
        <input type="text" value={todo} onChange={handleTodoChange} />
        <button onClick={writeToDatabase}>submit</button>
        <p>Make your own quiz to share with your friends and family, and even the whole world!🌍</p>
       </div>
    </div>
)
}
export default Home


