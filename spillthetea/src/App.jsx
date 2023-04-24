import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Post from "./Components/Post";
import PostCollection from "./Components/PostCollection";
import DetailPost from "./Routes/DetailPost";
import EditPost from "./Routes/EditPost";
import NewPost from "./Routes/NewPost";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const tempPost = {
    img: "https://images.pexels.com/photos/14270581/pexels-photo-14270581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "a sweet potato",
    date: "Mon, April 12th 2023",
    title: "How is everything replaced by AI in my company?",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis facere vitae error sint. Fugiat excepturi id porro sint ut, quia odit, reprehenderit quis quas natus, pariatur nobis commodi necessitatibus illo? Fugiat excepturi id porro sint ut, quia odit, reprehenderit quis quas natus, pariatur nobis commodi necessitatibus illo?",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index={true} element={<PostCollection />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/:id" element={<DetailPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
